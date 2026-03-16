import mongoose, { Schema, Document } from "mongoose";

export interface IPageConfig extends Document {
  pageId: string;
  name: string;
  path: string;
  iconKey?: string;
  enabled: boolean;
  visible: boolean;
  order: number;
  requiredAuth: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PageSchema = new Schema<IPageConfig>(
  {
    pageId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    path: { type: String, required: true },
    iconKey: String,
    enabled: { type: Boolean, default: true },
    visible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    requiredAuth: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const PageConfig = mongoose.model<IPageConfig>("PageConfig", PageSchema);

