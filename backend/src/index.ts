import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import createHttpError from "http-errors";
import { connectDb } from "./config/db.js";
import { corsAllowedOrigins, env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import inquiryRoutes from "./routes/inquiry.routes.js";
import projectRoutes from "./routes/project.routes.js";
import documentRoutes from "./routes/document.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import portalConfigRoutes from "./routes/portalConfig.routes.js";
import productRoutes from "./routes/product.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import blogRoutes from "./routes/blogroutes.js";

const app = express();

// Behind Nginx / reverse proxy — needed for correct client IP and secure cookies later
app.set("trust proxy", 1);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (corsAllowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    credentials: true
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

const uploadsDir = path.join(
  process.cwd(),
  process.env.UPLOAD_DIR ?? "uploads"
);

app.use("/uploads", express.static(uploadsDir));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/portal-config", portalConfigRoutes);
app.use("/api/products", productRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/blogs", blogRoutes);

app.use((_req, _res, next) => {
  next(createHttpError(404, "Not found"));
});

app.use(errorHandler);

const start = async (): Promise<void> => {
  await connectDb();
  app.listen(env.port, "0.0.0.0", () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${env.port}`);
  });
};

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server", err);
  process.exit(1);
});
