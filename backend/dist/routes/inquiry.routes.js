import { Router } from "express";
import { createInquiry, createInquiryForUser, deleteInquiry, getInquiry, listInquiries, listInquiriesForUser, updateInquiry } from "../controllers/inquiryController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
const router = Router();
// Public endpoint for creating inquiries
router.post("/", createInquiry);
// Authenticated endpoint that links inquiries to a user
router.post("/user", requireAuth, createInquiryForUser);
router.get("/user", requireAuth, listInquiriesForUser);
// Admin endpoints
router.get("/", requireAuth, requireRole("admin"), listInquiries);
router.get("/:id", requireAuth, requireRole("admin"), getInquiry);
router.patch("/:id", requireAuth, requireRole("admin"), updateInquiry);
router.delete("/:id", requireAuth, requireRole("admin"), deleteInquiry);
export default router;
