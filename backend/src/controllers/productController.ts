import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { z } from "zod";
import { Product } from "../models/Product.js";
import { notifyAdmin } from "../utils/notify.js";

const specSchema = z.object({
  label: z.string(),
  value: z.string()
});

const productSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  category: z.string().optional(),
  collectionId: z.string().optional(),
  // price comes as string from multipart/form-data
  price: z
    .preprocess((value) => {
      if (typeof value === "string" && value.trim() === "") {
        return undefined;
      }
      if (typeof value === "string") {
        const num = Number(value);
        return Number.isNaN(num) ? undefined : num;
      }
      return value;
    }, z.number().optional())
    .optional(),
  images: z.array(z.string()).optional(),
  heroImage: z.string().optional(),
  shortDescription: z.string().optional(),
  specifications: z
    .preprocess((value) => {
      if (typeof value === "string") {
        try {
          const parsed = JSON.parse(value);
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      }
      return value;
    }, z.array(specSchema).optional())
    .optional(),
  // features may come as single string or array of strings from multipart/form-data
  features: z
    .preprocess((value) => {
      if (typeof value === "string") {
        return value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean);
      }
      if (Array.isArray(value)) {
        return value.map((v) => String(v));
      }
      return [];
    }, z.array(z.string()).optional())
    .optional(),
  available: z.boolean().optional()
});

export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = productSchema.parse(req.body);

    const file = (req as any).file as Express.Multer.File | undefined;
    const heroImagePath = file ? `/uploads/${file.filename}` : data.heroImage;

    const product = await Product.create({
      slug: data.slug,
      name: data.name,
      category: data.category,
      collectionId: data.collectionId,
      price: data.price,
      images: data.images ?? [],
      heroImage: heroImagePath,
      shortDescription: data.shortDescription,
      specifications: data.specifications ?? [],
      features: data.features ?? [],
      available: data.available ?? true
    });

    await notifyAdmin({
      title: "Product created",
      message: `Product "${product.name}" was created.`,
      type: "success",
      category: "Products",
      meta: { entityType: "product", entityId: product.id, action: "create", actorUserId: req.user?.sub }
    });

    res.status(201).json({ product });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(createHttpError(400, "Invalid product data"));
    }
    next(err);
  }
};

export const listProducts = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ items: products });
  } catch (err) {
    next(err);
  }
};

export const listAvailableProducts = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await Product.find({ available: true }).sort({ createdAt: -1 });
    res.json({ items: products });
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw createHttpError(404, "Product not found");
    }
    await notifyAdmin({
      title: "Product updated",
      message: `Product "${product.name}" was updated.`,
      type: "info",
      category: "Products",
      meta: { entityType: "product", entityId: product.id, action: "update", actorUserId: req.user?.sub }
    });
    res.json({ product });
  } catch (err) {
    next(err);
  }
};

export const getProductBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, available: true });
    if (!product) {
      throw createHttpError(404, "Product not found");
    }
    res.json({ product });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = productSchema.partial().parse(req.body);

    const file = (req as any).file as Express.Multer.File | undefined;
    const heroImagePath = file ? `/uploads/${file.filename}` : undefined;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      heroImagePath
        ? {
            $set: {
              ...data,
              heroImage: heroImagePath
            }
          }
        : {
            $set: data
          },
      { new: true }
    );
    if (!product) {
      throw createHttpError(404, "Product not found");
    }
    res.json({ product });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(createHttpError(400, "Invalid product update"));
    }
    next(err);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      throw createHttpError(404, "Product not found");
    }
    await notifyAdmin({
      title: "Product deleted",
      message: `Product "${product.name}" was deleted.`,
      type: "warning",
      category: "Products",
      meta: { entityType: "product", entityId: product.id, action: "delete", actorUserId: req.user?.sub }
    });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

