import createHttpError from "http-errors";
import { z } from "zod";
import { Blog } from "../models/Blog.model.js";
import { notifyAdmin } from "../utils/notify.js";
// ─── Zod schemas ─────────────────────────────────────────────────────────────
const stringArray = z.preprocess((value) => {
    if (Array.isArray(value))
        return value;
    if (typeof value === "string") {
        try {
            const parsed = JSON.parse(value);
            if (Array.isArray(parsed))
                return parsed;
        }
        catch {
            return value.split(",").map((item) => item.trim()).filter(Boolean);
        }
    }
    return [];
}, z.array(z.string()).optional());
const blogSchema = z.object({
    title: z.string().min(1),
    slug: z.string().optional(),
    category: z.string().min(1),
    excerpt: z.string().min(1).max(300),
    content: z.string().min(1),
    heroImage: z.string().optional(),
    tags: stringArray,
    author: z.string().optional(),
    authorBio: z.string().optional(),
    authorImage: z.string().optional(),
    status: z.enum(["draft", "published"]).default("draft"),
    seoTitle: z.string().optional(),
    seoDescription: z.string().max(160).optional(),
    seoKeywords: stringArray,
    featured: z.boolean().optional()
});
const statusSchema = z.object({
    status: z.enum(["draft", "published"])
});
const paginationSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(50).default(9),
    category: z.string().optional(),
    tag: z.string().optional(),
    search: z.string().optional(),
    featured: z.coerce.boolean().optional(),
    status: z.enum(["draft", "published"]).optional()
});
// ─── Helpers ──────────────────────────────────────────────────────────────────
const buildSlug = (title) => title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
const ensureUniqueSlug = async (base, excludeId) => {
    let slug = base;
    let i = 1;
    while (true) {
        const existing = await Blog.findOne({ slug });
        if (!existing || existing._id.toString() === excludeId)
            return slug;
        slug = `${base}-${i++}`;
    }
};
// ─── PUBLIC ───────────────────────────────────────────────────────────────────
/** GET /api/blogs/public */
export const listPublicBlogs = async (req, res, next) => {
    try {
        const query = paginationSchema.parse(req.query);
        const { page, limit, category, tag, search, featured } = query;
        const filter = { status: "published" };
        if (category && category !== "All")
            filter.category = category;
        if (tag)
            filter.tags = { $in: [tag] };
        if (featured)
            filter.featured = true;
        if (search)
            filter.$text = { $search: search };
        const [items, total] = await Promise.all([
            Blog.find(filter)
                .select("-content -seoKeywords -authorBio")
                .sort({ publishedAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .lean(),
            Blog.countDocuments(filter)
        ]);
        res.json({
            items,
            pagination: { total, page, limit, totalPages: Math.ceil(total / limit) }
        });
    }
    catch (err) {
        if (err instanceof z.ZodError)
            return next(createHttpError(400, "Invalid query parameters"));
        next(err);
    }
};
/** GET /api/blogs/public/categories */
export const listPublicCategories = async (_req, res, next) => {
    try {
        const categories = await Blog.aggregate([
            { $match: { status: "published" } },
            { $group: { _id: "$category", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        res.json({ categories });
    }
    catch (err) {
        next(err);
    }
};
/** GET /api/blogs/public/:slug */
export const getPublicBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findOneAndUpdate({ slug: req.params.slug, status: "published" }, { $inc: { views: 1 } }, { new: true }).lean();
        if (!blog)
            throw createHttpError(404, "Blog post not found");
        const related = await Blog.find({
            status: "published",
            category: blog.category,
            _id: { $ne: blog._id }
        })
            .select("title slug excerpt heroImage category readTime publishedAt tags")
            .sort({ publishedAt: -1 })
            .limit(3)
            .lean();
        res.json({ blog, related });
    }
    catch (err) {
        next(err);
    }
};
// ─── ADMIN ────────────────────────────────────────────────────────────────────
/** GET /api/blogs/admin/stats */
export const getBlogStats = async (_req, res, next) => {
    try {
        const [total, published, drafts, viewsAgg] = await Promise.all([
            Blog.countDocuments(),
            Blog.countDocuments({ status: "published" }),
            Blog.countDocuments({ status: "draft" }),
            Blog.aggregate([{ $group: { _id: null, totalViews: { $sum: "$views" } } }])
        ]);
        res.json({
            stats: {
                total,
                published,
                drafts,
                totalViews: viewsAgg[0]?.totalViews ?? 0
            }
        });
    }
    catch (err) {
        next(err);
    }
};
/** GET /api/blogs/ (admin list — all statuses) */
export const listBlogs = async (req, res, next) => {
    try {
        const query = paginationSchema.parse(req.query);
        const { page, limit, status, search } = query;
        const filter = {};
        if (status)
            filter.status = status;
        if (search)
            filter.$text = { $search: search };
        const [items, total] = await Promise.all([
            Blog.find(filter)
                .select("-content")
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .lean(),
            Blog.countDocuments(filter)
        ]);
        res.json({
            items,
            pagination: { total, page, limit, totalPages: Math.ceil(total / limit) }
        });
    }
    catch (err) {
        if (err instanceof z.ZodError)
            return next(createHttpError(400, "Invalid query parameters"));
        next(err);
    }
};
/** GET /api/blogs/:id (admin — full doc) */
export const getBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog)
            throw createHttpError(404, "Blog not found");
        res.json({ blog });
    }
    catch (err) {
        next(err);
    }
};
/** POST /api/blogs/ */
export const createBlog = async (req, res, next) => {
    try {
        const data = blogSchema.parse(req.body);
        const files = req.files;
        const heroImagePath = files?.heroImage?.[0] ? `/uploads/${files.heroImage[0].filename}` : undefined;
        const authorImagePath = files?.authorImage?.[0] ? `/uploads/${files.authorImage[0].filename}` : undefined;
        const baseSlug = data.slug || buildSlug(data.title);
        const finalSlug = await ensureUniqueSlug(baseSlug);
        const blog = await Blog.create({
            title: data.title,
            slug: finalSlug,
            category: data.category,
            excerpt: data.excerpt,
            content: data.content,
            heroImage: heroImagePath ?? data.heroImage ?? "",
            tags: data.tags ?? [],
            author: data.author ?? "Winsume Lift Team",
            authorBio: data.authorBio ?? "",
            authorImage: authorImagePath ?? data.authorImage ?? "",
            status: data.status,
            seoTitle: data.seoTitle ?? data.title,
            seoDescription: data.seoDescription ?? data.excerpt,
            seoKeywords: data.seoKeywords ?? [],
            featured: data.featured ?? false
        });
        await notifyAdmin({
            title: "Blog post created",
            message: `Blog "${blog.title}" was created as ${blog.status}.`,
            type: "success",
            category: "Blog",
            meta: {
                entityType: "blog",
                entityId: blog.id,
                action: "create",
                actorUserId: req.user?.sub
            }
        });
        res.status(201).json({ blog });
    }
    catch (err) {
        if (err instanceof z.ZodError)
            return next(createHttpError(400, "Invalid blog data"));
        next(err);
    }
};
/** PATCH /api/blogs/:id */
export const updateBlog = async (req, res, next) => {
    try {
        const data = blogSchema.partial().parse(req.body);
        const files = req.files;
        const heroImagePath = files?.heroImage?.[0] ? `/uploads/${files.heroImage[0].filename}` : undefined;
        const authorImagePath = files?.authorImage?.[0] ? `/uploads/${files.authorImage[0].filename}` : undefined;
        // If slug is changing, ensure uniqueness
        if (data.slug) {
            data.slug = await ensureUniqueSlug(data.slug, req.params.id);
        }
        const setPayload = { ...data };
        if (heroImagePath)
            setPayload.heroImage = heroImagePath;
        if (authorImagePath)
            setPayload.authorImage = authorImagePath;
        const blog = await Blog.findByIdAndUpdate(req.params.id, { $set: setPayload }, { new: true, runValidators: true });
        if (!blog)
            throw createHttpError(404, "Blog not found");
        await notifyAdmin({
            title: "Blog post updated",
            message: `Blog "${blog.title}" was updated.`,
            type: "info",
            category: "Blog",
            meta: {
                entityType: "blog",
                entityId: blog.id,
                action: "update",
                actorUserId: req.user?.sub
            }
        });
        res.json({ blog });
    }
    catch (err) {
        if (err instanceof z.ZodError)
            return next(createHttpError(400, "Invalid blog update data"));
        next(err);
    }
};
/** PATCH /api/blogs/:id/status */
export const updateBlogStatus = async (req, res, next) => {
    try {
        const { status } = statusSchema.parse(req.body);
        const blog = await Blog.findByIdAndUpdate(req.params.id, {
            $set: {
                status,
                ...(status === "published" ? { publishedAt: new Date() } : {})
            }
        }, { new: true }).select("-content");
        if (!blog)
            throw createHttpError(404, "Blog not found");
        await notifyAdmin({
            title: "Blog status changed",
            message: `Blog "${blog.title}" is now ${status}.`,
            type: status === "published" ? "success" : "info",
            category: "Blog",
            meta: {
                entityType: "blog",
                entityId: blog.id,
                action: "update",
                actorUserId: req.user?.sub
            }
        });
        res.json({ blog });
    }
    catch (err) {
        if (err instanceof z.ZodError)
            return next(createHttpError(400, "Invalid status value"));
        next(err);
    }
};
/** PATCH /api/blogs/:id/featured */
export const toggleFeatured = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog)
            throw createHttpError(404, "Blog not found");
        blog.featured = !blog.featured;
        await blog.save();
        res.json({ featured: blog.featured });
    }
    catch (err) {
        next(err);
    }
};
/** DELETE /api/blogs/:id */
export const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog)
            throw createHttpError(404, "Blog not found");
        await notifyAdmin({
            title: "Blog post deleted",
            message: `Blog "${blog.title}" was deleted.`,
            type: "warning",
            category: "Blog",
            meta: {
                entityType: "blog",
                entityId: blog.id,
                action: "delete",
                actorUserId: req.user?.sub
            }
        });
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};
