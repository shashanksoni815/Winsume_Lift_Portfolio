import mongoose, { Schema } from "mongoose";
const FeatureSchema = new Schema({
    title: { type: String, required: true },
    description: String
}, { _id: false });
const HighlightSchema = new Schema({
    iconKey: String,
    title: { type: String, required: true },
    description: String
}, { _id: false });
const SpecSchema = new Schema({
    label: String,
    value: String
}, { _id: false });
const CollectionSchema = new Schema({
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    tagline: String,
    priceFrom: Number,
    priceUSDFrom: Number,
    category: String,
    description: String,
    fullDescription: String,
    mainImage: String,
    gallery: { type: [String], default: [] },
    features: { type: [FeatureSchema], default: [] },
    specifications: { type: [SpecSchema], default: [] },
    highlights: { type: [HighlightSchema], default: [] }
}, { timestamps: true });
export const Collection = mongoose.model("Collection", CollectionSchema);
