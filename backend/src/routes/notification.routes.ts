import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import {
  deleteNotification,
  listNotifications,
  markAllNotificationsRead,
  markNotificationRead
} from "../controllers/notificationController.js";

const router = Router();

router.get("/", requireAuth, requireRole("admin"), listNotifications);
router.patch("/:id/read", requireAuth, requireRole("admin"), markNotificationRead);
router.post("/mark-all-read", requireAuth, requireRole("admin"), markAllNotificationsRead);
router.delete("/:id", requireAuth, requireRole("admin"), deleteNotification);

export default router;

