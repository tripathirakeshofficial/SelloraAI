import axios from "axios";
import { NextFunction, Request, Response } from "express";
import redis from "../../../shared/redis/redis.js";

interface IUserSession {
  userId: string;
  name: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user: IUserSession;
    }
  }
}

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sessionId = req.cookies?.session;

    if (!sessionId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const sessionKey = `session:${sessionId}`;
    const session = await redis.get(sessionKey);

    if (!session) {
      res.clearCookie("session", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return res.status(401).json({
        success: false,
        message: "Session Expired",
      });
    }

    let sessionUser: IUserSession;

    try {
      sessionUser = JSON.parse(session) as IUserSession;
    } catch {
      await redis.del(sessionKey);

      res.clearCookie("session", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return res.status(401).json({
        success: false,
        message: "Invalid session",
      });
    }

    if (
      !sessionUser ||
      typeof sessionUser.userId !== "string" ||
      !sessionUser.userId.trim()
    ) {
      await redis.del(sessionKey);

      res.clearCookie("session", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return res.status(401).json({
        success: false,
        message: "Invalid session",
      });
    }

    const authServiceUrl = process.env.AUTH_SERVICE_URL;
    const internalSecret = process.env.INTERNAL_AUTH_SECRET;

    if (!authServiceUrl || !internalSecret) {
      console.error("Auth service URL or internal secret is missing");

      return res.status(500).json({
        success: false,
        message: "Authentication service configuration error",
      });
    }

    let validationResponse;

    try {
      validationResponse = await axios.post(
        `${authServiceUrl}/validate-session`,
        { userId: sessionUser.userId },
        {
          headers: {
            "x-internal-auth-secret": internalSecret,
          },
          timeout: 5000,
        },
      );
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        (error.response?.status === 401 || error.response?.status === 403)
      ) {
        await redis.del(sessionKey);

        res.clearCookie("session", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        return res.status(error.response.status).json({
          success: false,
          message:
            error.response.status === 403
              ? "Your account is inactive"
              : "Authentication required",
        });
      }

      console.error("Account validation request failed:", error);

      return res.status(503).json({
        success: false,
        message: "Authentication service temporarily unavailable",
      });
    }

    if (!validationResponse.data?.success || !validationResponse.data?.user) {
      await redis.del(sessionKey);

      res.clearCookie("session", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return res.status(401).json({
        success: false,
        message: "Invalid session",
      });
    }

    // Use current account details, not potentially stale Redis values.
    req.user = validationResponse.data.user as IUserSession;

    return next();
  } catch (error) {
    console.error("isAuth error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
