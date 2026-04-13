// // src/utils/paths.ts
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export const backendRoot = path.resolve(__dirname, "../../");
// export const uploadsPath = path.join(backendRoot, "uploads");

// src/utils/paths.ts
import path from "path";

// 🔥 Detect environment
const isProduction = process.env.NODE_ENV === "production";

// 🔥 Uploads path
export const uploadsPath = isProduction
  ? "/app/uploads" // Docker
  : path.resolve("backend/uploads"); // Local dev

// Debug (remove later)
console.log("Resolved uploadsPath:", uploadsPath);