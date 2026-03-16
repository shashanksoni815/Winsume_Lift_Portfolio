import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProject,
  listProjects,
  listProjectsForUser,
  updateProject
} from "../controllers/projectController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();

// Admin CRUD
router.get("/", requireAuth, requireRole("admin"), listProjects);
router.post("/", requireAuth, requireRole("admin"), createProject);
router.get("/:id", requireAuth, requireRole("admin"), getProject);
router.patch("/:id", requireAuth, requireRole("admin"), updateProject);
router.delete("/:id", requireAuth, requireRole("admin"), deleteProject);

// Authenticated user projects
router.get("/user/me", requireAuth, listProjectsForUser);

export default router;

