import mongoose, { Schema } from "mongoose";
const SpecSchema = new Schema({ label: String, value: String }, { _id: false });
const HighlightStatSchema = new Schema({
    icon: { type: String, default: "Package" },
    label: String,
    value: String,
    unit: String
}, { _id: false });
const DetailedFeatureSchema = new Schema({
    title: String,
    description: String
}, { _id: false });
const BadgeSchema = new Schema({
    label: String,
    color: { type: String, default: "orange" }
}, { _id: false });
const ProductSchema = new Schema({
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    category: String,
    collectionId: { type: Schema.Types.ObjectId, ref: "Collection" },
    price: Number,
    images: { type: [String], default: [] },
    heroImage: String,
    shortDescription: String,
    longDescription: String,
    specifications: { type: [SpecSchema], default: [] },
    fullSpecifications: { type: [SpecSchema], default: [] },
    features: { type: [String], default: [] },
    detailedFeatures: { type: [DetailedFeatureSchema], default: [] },
    highlightStats: { type: [HighlightStatSchema], default: [] },
    badges: { type: [BadgeSchema], default: [] },
    available: { type: Boolean, default: true }
}, { timestamps: true });
export const Product = mongoose.model("Product", ProductSchema);
