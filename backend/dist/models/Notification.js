import { Schema, model } from "mongoose";
const notificationMetaSchema = new Schema({
    entityType: { type: String },
    entityId: { type: String },
    action: { type: String },
    actorUserId: { type: String }
}, { _id: false });
const notificationSchema = new Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["success", "warning", "info", "error"], default: "info" },
    category: { type: String, default: "System" },
    read: { type: Boolean, default: false },
    meta: { type: notificationMetaSchema, default: undefined }
}, { timestamps: true });
export const Notification = model("Notification", notificationSchema);
