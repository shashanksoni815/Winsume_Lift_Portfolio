import mongoose, { Schema, Document } from "mongoose";

interface ISpec {
  label: string;
  value: string;
}

export interface IProduct extends Document {
  slug: string;
  name: string;
  category?: string;
  collectionId?: mongoose.Types.ObjectId;
  price?: number;
  images: string[];
  heroImage?: string;
  shortDescription?: string;
  specifications?: ISpec[];
  features?: string[];
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SpecSchema = new Schema<ISpec>(
  {
    label: String,
    value: String
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
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
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);

