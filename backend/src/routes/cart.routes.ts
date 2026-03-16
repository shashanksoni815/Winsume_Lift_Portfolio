import express from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  addItemToCart,
  clearMyCart,
  getMyCart,
  removeCartItem,
  updateCartItemQuantity
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/me", requireAuth, getMyCart);
router.post("/items", requireAuth, addItemToCart);
router.patch("/items/:itemId", requireAuth, updateCartItemQuantity);
router.delete("/items/:itemId", requireAuth, removeCartItem);
router.delete("/me", requireAuth, clearMyCart);

export default router;

