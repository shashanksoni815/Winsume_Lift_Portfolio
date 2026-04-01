import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProject,
  listProjects,
  listProjectsForUser,
  listPublicProjects,
  updateProject
} from "../controllers/projectController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = Router();

// Public portfolio listing
router.get("/public", listPublicProjects);

// Admin CRUD
router.get("/", requireAuth, requireRole("admin"), listProjects);
router.post("/", requireAuth, requireRole("admin"), upload.single("image"), createProject);
router.get("/:id", requireAuth, requireRole("admin"), getProject);
router.patch("/:id", requireAuth, requireRole("admin"), upload.single("image"), updateProject);
router.delete("/:id", requireAuth, requireRole("admin"), deleteProject);

// Authenticated user projects
router.get("/user/me", requireAuth, listProjectsForUser);

export default router;

