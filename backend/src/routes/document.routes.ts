import { Router } from "express";
import {
  createDocument,
  deleteDocument,
  getDocument,
  listDocuments,
  listDocumentsForUser,
  updateDocument
} from "../controllers/documentController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();

// Admin CRUD
router.get("/", requireAuth, requireRole("admin"), listDocuments);
router.post("/", requireAuth, requireRole("admin"), createDocument);
router.get("/:id", requireAuth, requireRole("admin"), getDocument);
router.patch("/:id", requireAuth, requireRole("admin"), updateDocument);
router.delete("/:id", requireAuth, requireRole("admin"), deleteDocument);

// Authenticated user documents
router.get("/user/me", requireAuth, listDocumentsForUser);

export default router;

