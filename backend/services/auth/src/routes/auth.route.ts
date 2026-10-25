import express from "express";
import {
  login,
  logout,
  validateSession,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/validate-session", validateSession);
authRouter.post("/logout", logout);

export default authRouter;
