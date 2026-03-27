import mongoose, { Schema } from "mongoose";
const BlogSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    heroImage: { type: String, default: "" },
    tags: { type: [String], default: [] },
    author: { type: String, default: "Winsume Lift Team" },
    authorBio: { type: String, default: "" },
    authorImage: { type: String, default: "" },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    seoKeywords: { type: [String], default: [] },
    readTime: { type: String, default: "5 min read" },
    views: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null }
}, { timestamps: true });
// Auto-generate slug from title if not provided
BlogSchema.pre("validate", function (next) {
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-");
    }
    next();
});
// Auto-calculate read time (~200 words/min) and set publishedAt
BlogSchema.pre("save", function (next) {
    if (this.content) {
        const wordCount = this.content.replace(/<[^>]+>/g, "").split(/\s+/).length;
        this.readTime = `${Math.ceil(wordCount / 200)} min read`;
    }
    if (this.status === "published" && !this.publishedAt) {
        this.publishedAt = new Date();
    }
    next();
});
// Full-text search index
BlogSchema.index({ title: "text", content: "text", tags: "text" });
BlogSchema.index({ status: 1, publishedAt: -1 });
BlogSchema.index({ category: 1 });
BlogSchema.index({ featured: 1 });
export const Blog = mongoose.model("Blog", BlogSchema);
