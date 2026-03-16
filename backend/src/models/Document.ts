import mongoose, { Schema, Document as MongooseDocument } from "mongoose";

export interface IDocument extends MongooseDocument {
  userId: mongoose.Types.ObjectId;
  projectId?: mongoose.Types.ObjectId;
  name: string;
  url: string;
  sizeBytes?: number;
  mimeType?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema = new Schema<IDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project" },
    name: { type: String, required: true },
    url: { type: String, required: true },
    sizeBytes: Number,
    mimeType: String,
    description: String
  },
  { timestamps: true }
);

DocumentSchema.index({ userId: 1, createdAt: -1 });

export const Document = mongoose.model<IDocument>("Document", DocumentSchema);

