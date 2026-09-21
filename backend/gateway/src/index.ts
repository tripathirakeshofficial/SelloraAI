import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.json("Hello from SelloraAI Gateway");
});

app.listen(PORT, () => {
  console.log(`Gateway Server running on ${PORT}`);
});
