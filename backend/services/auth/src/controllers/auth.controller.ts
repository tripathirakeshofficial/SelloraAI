import { Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";
import redis from "../../../../shared/redis/redis.js";
import { app } from "../configs/firebase.js";
import User from "../model/user.model.js";

export const login = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    // Verify the Firebase token before trusting the user's identity.
    let decoded;

    try {
      decoded = await getAuth(app).verifyIdToken(token);
    } catch (error) {
      console.error("Firebase token verification failed:", error);

      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

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

    // Prevent inactive accounts from creating authenticated sessions.
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive. Please contact support.",
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
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

export const validateSession = async (req: Request, res: Response) => {
  try {
    // Allow only requests authenticated by the gateway's internal secret.
    const internalSecret = process.env.INTERNAL_AUTH_SECRET;

    if (
      !internalSecret ||
      req.headers["x-internal-auth-secret"] !== internalSecret
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { userId } = req.body;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Valid user ID is required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Session validation error:", error);

    return res.status(500).json({
      success: false,
      message: "Session validation failed",
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
      secure: process.env.NODE_ENV === "production",
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
