import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import proxy from "express-http-proxy";
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
