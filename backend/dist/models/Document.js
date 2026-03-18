import mongoose, { Schema } from "mongoose";
const DocumentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project" },
    name: { type: String, required: true },
    url: { type: String, required: true },
    sizeBytes: Number,
    mimeType: String,
    description: String
}, { timestamps: true });
DocumentSchema.index({ userId: 1, createdAt: -1 });
export const Document = mongoose.model("Document", DocumentSchema);
