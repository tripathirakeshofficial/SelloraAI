import { Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";
import redis from "../../../../shared/redis/redis.js";
import { app } from "../configs/firebase.js";
import User from "../model/user.model.js";

export const login = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    // Verify the Firebase token before trusting the user's identity.
    const decoded = await getAuth(app).verifyIdToken(token);

    let user = await User.findOne({
      firebaseUid: decoded.uid,
    });

    if (!user) {
      user = await User.create({
        name: decoded.name || "",
        email: decoded.email || "",
        firebaseUid: decoded.uid,
      });
    }

    const sessionId = crypto.randomUUID();

    // Store session state server-side; the browser only receives an opaque session ID.
    await redis.set(
      `session:${sessionId}`,
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }),
      "EX",
      7 * 24 * 60 * 60,
    );

    // Use an HTTP-only, strict same-site cookie for the server-side session.
    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const sessionId = req.cookies?.session;

    if (sessionId) {
      await redis.del(`session:${sessionId}`);
    }
    res.clearCookie("session", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};
