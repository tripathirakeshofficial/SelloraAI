import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import proxy from "express-http-proxy";
import morgan from "morgan";
import { getCurrentUser } from "./controller/user.controller.js";
import { isAuth } from "./middleware/isAuth.js";

dotenv.config();

const app = express();

const allowedOrigins = (process.env.FRONTEND_URL ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header, such as server-to-server calls.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.json("Hello from SelloraAI Gateway");
});

app.get("/api/me", isAuth, getCurrentUser);

// Route authentication requests through the gateway to the auth service.
app.use(
  "/api/auth",
  proxy(process.env.AUTH_SERVICE_URL as string, {
    timeout: 10000,
  }),
);

app.listen(PORT, () => {
  console.log(`Gateway Server running on ${PORT}`);
});
