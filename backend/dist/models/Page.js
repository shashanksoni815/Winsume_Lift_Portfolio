import mongoose, { Schema } from "mongoose";
const PageSchema = new Schema({
    pageId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    path: { type: String, required: true },
    iconKey: String,
    enabled: { type: Boolean, default: true },
    visible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    requiredAuth: { type: Boolean, default: false }
}, { timestamps: true });
export const PageConfig = mongoose.model("PageConfig", PageSchema);
