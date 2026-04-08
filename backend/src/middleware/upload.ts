import multer, { type FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import type { Request } from "express";
import { fileURLToPath } from "url";

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Always resolve to backend root (works in src + dist)
const backendRoot = path.resolve(__dirname, "../../");

// Upload directory (default: backend/uploads)
const uploadDir = path.join(
  backendRoot,
  process.env.UPLOAD_DIR || "uploads"
);

// Ensure folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage config
const storage = multer.diskStorage({
  destination(
    _req: Request,
    _file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(null, uploadDir);
  },

  filename(
    _req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);

    // safer unique name
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    cb(null, `${base}-${unique}${ext}`);
  },
});

// Multer instance
export const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },

  fileFilter(
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }

    cb(null, true);
  },
});