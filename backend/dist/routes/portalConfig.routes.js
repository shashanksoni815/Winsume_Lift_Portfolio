import { Router } from "express";
import { getPortalConfig, updatePortalConfig, resetPortalConfig } from "../controllers/portalConfigController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
const router = Router();
// Public: homepage can read configuration
router.get("/", getPortalConfig);
// Admin: update and reset configuration
router.patch("/", requireAuth, requireRole("admin"), updatePortalConfig);
router.post("/reset", requireAuth, requireRole("admin"), resetPortalConfig);
export default router;
