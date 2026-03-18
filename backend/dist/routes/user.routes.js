import { Router } from "express";
import { createUser, deleteUser, getMe, getUser, listUsers, updateMe, updateMyPassword, updateUser } from "../controllers/userController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
const router = Router();
// Admin user management
router.get("/", requireAuth, requireRole("admin"), listUsers);
router.post("/", requireAuth, requireRole("admin"), createUser);
router.get("/:id", requireAuth, requireRole("admin"), getUser);
router.patch("/:id", requireAuth, requireRole("admin"), updateUser);
router.delete("/:id", requireAuth, requireRole("admin"), deleteUser);
// Self-service profile
router.get("/me/profile", requireAuth, getMe);
router.patch("/me/profile", requireAuth, updateMe);
router.patch("/me/password", requireAuth, updateMyPassword);
export default router;
