import mongoose, { Schema, Document } from "mongoose";

interface IFeature {
  title: string;
  description?: string;
}

interface IHighlight {
  iconKey?: string;
  title: string;
  description?: string;
}

interface ISpec {
  label: string;
  value: string;
}

export interface ICollection extends Document {
  slug: string;
  name: string;
  tagline?: string;
  priceFrom?: number;
  priceUSDFrom?: number;
  category?: string;
  description?: string;
  fullDescription?: string;
  mainImage?: string;
  gallery: string[];
  features: IFeature[];
  specifications: ISpec[];
  highlights: IHighlight[];
  createdAt: Date;
  updatedAt: Date;
}

const FeatureSchema = new Schema<IFeature>(
  {
    title: { type: String, required: true },
    description: String
  },
  { _id: false }
);

const HighlightSchema = new Schema<IHighlight>(
  {
    iconKey: String,
    title: { type: String, required: true },
    description: String
  },
  { _id: false }
);

const SpecSchema = new Schema<ISpec>(
  {
    label: String,
    value: String
  },
  { _id: false }
);

const CollectionSchema = new Schema<ICollection>(
  {
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
  },
  { timestamps: true }
);

export const Collection = mongoose.model<ICollection>("Collection", CollectionSchema);

