import { Router } from "express";
import {
  listPublicBlogs,
  listPublicCategories,
  getPublicBlog,
  getBlogStats,
  listBlogs,
  getBlog,
  createBlog,
  updateBlog,
  updateBlogStatus,
  toggleFeatured,
  deleteBlog
} from "../controllers/blogController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = Router();

// ─── Public (no auth) ─────────────────────────────────────────────────────────
// NOTE: static segments must come before /:slug to avoid route conflicts
router.get("/public",            listPublicBlogs);
router.get("/public/categories", listPublicCategories);
router.get("/public/:slug",      getPublicBlog);

// ─── Admin CRUD ───────────────────────────────────────────────────────────────
router.get(   "/stats",          requireAuth, requireRole("admin"), getBlogStats);
router.get(   "/",               requireAuth, requireRole("admin"), listBlogs);
router.post(
  "/",
  requireAuth,
  requireRole("admin"),
  upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "authorImage", maxCount: 1 }
  ]),
  createBlog
);
router.get(   "/:id",            requireAuth, requireRole("admin"), getBlog);
router.patch(
  "/:id",
  requireAuth,
  requireRole("admin"),
  upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "authorImage", maxCount: 1 }
  ]),
  updateBlog
);
router.patch( "/:id/status",     requireAuth, requireRole("admin"), updateBlogStatus);
router.patch( "/:id/featured",   requireAuth, requireRole("admin"), toggleFeatured);
router.delete("/:id",            requireAuth, requireRole("admin"), deleteBlog);

export default router;