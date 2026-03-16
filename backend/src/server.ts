import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import createHttpError from "http-errors";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import inquiryRoutes from "./routes/inquiry.routes.js";
import projectRoutes from "./routes/project.routes.js";
import documentRoutes from "./routes/document.routes.js";
import cartRoutes from "./routes/cart.routes.js";

const app = express();

app.use(
  cors({
    origin: env.frontendOrigin,
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/cart", cartRoutes);

app.use((_req, _res, next) => {
  next(createHttpError(404, "Not found"));
});

app.use(errorHandler);

const start = async (): Promise<void> => {
  await connectDb();
  app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${env.port}`);
  });
};

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server", err);
  process.exit(1);
});

