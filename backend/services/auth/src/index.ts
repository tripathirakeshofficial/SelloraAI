import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { connectDb } from "./configs/db.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.json("Hello from SelloraAI Auth Service");
});

app.use("/", authRouter);

await connectDb();

app.listen(PORT, () => {
  console.log(`Auth Service Server running on ${PORT}`);
});
