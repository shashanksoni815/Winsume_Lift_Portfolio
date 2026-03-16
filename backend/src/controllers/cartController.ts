import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { z } from "zod";
import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";

const addItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1).optional()
});

const updateQuantitySchema = z.object({
  quantity: z.number().int().min(1)
});

export const getMyCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw createHttpError(401, "Authentication required");
    }

    const cart = await Cart.findOne({ userId: req.user.sub, status: "open" });
    res.json({ cart });
  } catch (err) {
    next(err);
  }
};

export const addItemToCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw createHttpError(401, "Authentication required");
    }

    const data = addItemSchema.parse(req.body);

    const product = await Product.findById(data.productId);
    if (!product) {
      throw createHttpError(404, "Product not found");
    }
    if (!product.available) {
      throw createHttpError(400, "Product is not available");
    }

    const quantityToAdd = data.quantity ?? 1;

    let cart = await Cart.findOne({ userId: req.user.sub, status: "open" });
    if (!cart) {
      cart = new Cart({
        userId: req.user.sub,
        items: []
      });
    }

    const existingItem = cart.items.find((item) => item.productId.toString() === product._id.toString());
    if (existingItem) {
      existingItem.quantity += quantityToAdd;
    } else {
      cart.items.push({
        productId: product._id,
        name: product.name,
        category: product.category,
        price: product.price ?? 0,
        image: product.heroImage || product.images[0],
        specifications: product.shortDescription,
        quantity: quantityToAdd
      });
    }

    await cart.save();

    res.status(201).json({ cart });
  } catch (err) {
    next(err);
  }
};

export const updateCartItemQuantity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw createHttpError(401, "Authentication required");
    }

    const { itemId } = req.params;
    const data = updateQuantitySchema.parse(req.body);

    const cart = await Cart.findOne({ userId: req.user.sub, status: "open" });
    if (!cart) {
      throw createHttpError(404, "Cart not found");
    }

    const item = cart.items.id(itemId);
    if (!item) {
      throw createHttpError(404, "Cart item not found");
    }

    item.quantity = data.quantity;
    await cart.save();

    res.json({ cart });
  } catch (err) {
    next(err);
  }
};

export const removeCartItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw createHttpError(401, "Authentication required");
    }

    const { itemId } = req.params;

    const cart = await Cart.findOne({ userId: req.user.sub, status: "open" });
    if (!cart) {
      throw createHttpError(404, "Cart not found");
    }

    const item = cart.items.id(itemId);
    if (!item) {
      throw createHttpError(404, "Cart item not found");
    }

    item.deleteOne();
    await cart.save();

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const clearMyCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw createHttpError(401, "Authentication required");
    }

    const cart = await Cart.findOne({ userId: req.user.sub, status: "open" });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

