import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductBySlug,
  listAvailableProducts,
  listProducts,
  updateProduct
} from "../controllers/productController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = Router();

// Public product access
router.get("/public", listAvailableProducts);
router.get("/slug/:slug", getProductBySlug);

// Admin CRUD
router.get("/", requireAuth, requireRole("admin"), listProducts);
router.post("/", requireAuth, requireRole("admin"), upload.single("heroImage"), createProduct);
router.get("/:id", requireAuth, requireRole("admin"), getProduct);
router.patch("/:id", requireAuth, requireRole("admin"), upload.single("heroImage"), updateProduct);
router.delete("/:id", requireAuth, requireRole("admin"), deleteProduct);

export default router;

