import mongoose, { Schema } from "mongoose";
const SpecSchema = new Schema({
    label: String,
    value: String
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
    specifications: { type: [SpecSchema], default: [] },
    features: { type: [String], default: [] },
    available: { type: Boolean, default: true }
}, { timestamps: true });
export const Product = mongoose.model("Product", ProductSchema);
