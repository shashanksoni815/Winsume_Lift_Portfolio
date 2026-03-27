import createHttpError from "http-errors";
import { z } from "zod";
import { Product } from "../models/Product.js";
import { notifyAdmin } from "../utils/notify.js";
// ─── Sub-schemas ────────────────────────────────────────────────────────────
const specSchema = z.object({
    label: z.string(),
    value: z.string()
});
const highlightStatSchema = z.object({
    icon: z.string().default("Package"),
    label: z.string(),
    value: z.string(),
    unit: z.string()
});
const detailedFeatureSchema = z.object({
    title: z.string(),
    description: z.string()
});
const badgeSchema = z.object({
    label: z.string(),
    color: z.string().default("orange")
});
// ─── JSON array preprocessor (shared for multipart/form-data fields) ─────────
const jsonArray = (itemSchema) => z.preprocess((value) => {
    if (typeof value === "string") {
        try {
            const parsed = JSON.parse(value);
            return Array.isArray(parsed) ? parsed : [];
        }
        catch {
            return [];
        }
    }
    return value ?? [];
}, z.array(itemSchema).optional());
// ─── Main product schema ─────────────────────────────────────────────────────
const productSchema = z.object({
    slug: z.string().min(1),
    name: z.string().min(1),
    category: z.string().optional(),
    collectionId: z.string().optional(),
    price: z
        .preprocess((v) => {
        if (typeof v === "string" && v.trim() === "")
            return undefined;
        if (typeof v === "string") {
            const n = Number(v);
            return Number.isNaN(n) ? undefined : n;
        }
        return v;
    }, z.number().optional())
        .optional(),
    images: z.array(z.string()).optional(),
    heroImage: z.string().optional(),
    shortDescription: z.string().optional(),
    longDescription: z.string().optional(),
    // simple key/value specs — shown in the 2×2 grid
    specifications: jsonArray(specSchema),
    // full spec table
    fullSpecifications: jsonArray(specSchema),
    // legacy simple features (comma-separated string from form)
    features: z
        .preprocess((v) => {
        if (typeof v === "string") {
            return v.split(",").map((s) => s.trim()).filter(Boolean);
        }
        if (Array.isArray(v))
            return v.map(String);
        return [];
    }, z.array(z.string()).optional())
        .optional(),
    // rich features with title + description
    detailedFeatures: jsonArray(detailedFeatureSchema),
    // 4 big stat highlight cards
    highlightStats: jsonArray(highlightStatSchema),
    // badges e.g. ISO Certified
    badges: jsonArray(badgeSchema),
    available: z.boolean().optional()
});
// ─── Helper: build product payload from validated data ───────────────────────
function buildPayload(data, heroImagePath) {
    return {
        slug: data.slug,
        name: data.name,
        category: data.category,
        collectionId: data.collectionId,
        price: data.price,
        images: data.images ?? [],
        heroImage: heroImagePath ?? data.heroImage,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        specifications: data.specifications ?? [],
        fullSpecifications: data.fullSpecifications ?? [],
        features: data.features ?? [],
        detailedFeatures: data.detailedFeatures ?? [],
        highlightStats: data.highlightStats ?? [],
        badges: data.badges ?? [],
        available: data.available ?? true
    };
}
// ─── Handlers ────────────────────────────────────────────────────────────────
export const createProduct = async (req, res, next) => {
    try {
        const data = productSchema.parse(req.body);
        const file = req.file;
        const heroImagePath = file ? `/uploads/${file.filename}` : undefined;
        const product = await Product.create(buildPayload(data, heroImagePath));
        await notifyAdmin({
            title: "Product created",
            message: `Product "${product.name}" was created.`,
            type: "success",
            category: "Products",
            meta: { entityType: "product", entityId: product.id, action: "create", actorUserId: req.user?.sub }
        });
        res.status(201).json({ product });
    }
    catch (err) {
        if (err instanceof z.ZodError)
            return next(createHttpError(400, "Invalid product data"));
        next(err);
    }
};
export const listProducts = async (_req, res, next) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json({ items: products });
    }
    catch (err) {
        next(err);
    }
};
export const listAvailableProducts = async (_req, res, next) => {
    try {
        const products = await Product.find({ available: true }).sort({ createdAt: -1 });
        res.json({ items: products });
    }
    catch (err) {
        next(err);
    }
};
export const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product)
            throw createHttpError(404, "Product not found");
        res.json({ product });
    }
    catch (err) {
        next(err);
    }
};
export const getProductBySlug = async (req, res, next) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug, available: true });
        if (!product)
            throw createHttpError(404, "Product not found");
        res.json({ product });
    }
    catch (err) {
        next(err);
    }
};
export const updateProduct = async (req, res, next) => {
    try {
        const data = productSchema.partial().parse(req.body);
        const file = req.file;
        const heroImagePath = file ? `/uploads/${file.filename}` : undefined;
        const setPayload = { ...data };
        if (heroImagePath)
            setPayload.heroImage = heroImagePath;
        const product = await Product.findByIdAndUpdate(req.params.id, { $set: setPayload }, { new: true });
        if (!product)
            throw createHttpError(404, "Product not found");
        await notifyAdmin({
            title: "Product updated",
            message: `Product "${product.name}" was updated.`,
            type: "info",
            category: "Products",
            meta: { entityType: "product", entityId: product.id, action: "update", actorUserId: req.user?.sub }
        });
        res.json({ product });
    }
    catch (err) {
        if (err instanceof z.ZodError)
            return next(createHttpError(400, "Invalid product update"));
        next(err);
    }
};
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product)
            throw createHttpError(404, "Product not found");
        await notifyAdmin({
            title: "Product deleted",
            message: `Product "${product.name}" was deleted.`,
            type: "warning",
            category: "Products",
            meta: { entityType: "product", entityId: product.id, action: "delete", actorUserId: req.user?.sub }
        });
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};
