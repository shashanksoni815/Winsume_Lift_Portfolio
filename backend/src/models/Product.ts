import mongoose, { Schema, Document } from "mongoose";

interface ISpec {
  label: string;
  value: string;
}

interface IHighlightStat {
  icon: string;        // icon name: "Package" | "Gauge" | "Zap" | "Shield"
  label: string;       // e.g. "Capacity"
  value: string;       // e.g. "6 - 10"
  unit: string;        // e.g. "Persons"
}

interface IDetailedFeature {
  title: string;       // e.g. "Machine Room-Less Design"
  description: string; // e.g. "Space-saving technology..."
}

interface IBadge {
  label: string;       // e.g. "ISO Certified"
  color: string;       // "green" | "orange" | "blue"
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
  longDescription?: string;
  specifications?: ISpec[];          // key specs shown in the 2x2 grid (top 4)
  fullSpecifications?: ISpec[];      // full spec table in "Technical Details"
  features?: string[];               // simple comma-separated features (legacy)
  detailedFeatures?: IDetailedFeature[]; // features with title + description
  highlightStats?: IHighlightStat[]; // 4 big stat cards
  badges?: IBadge[];                 // e.g. ISO Certified, Power Class
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SpecSchema = new Schema<ISpec>(
  { label: String, value: String },
  { _id: false }
);

const HighlightStatSchema = new Schema<IHighlightStat>(
  {
    icon: { type: String, default: "Package" },
    label: String,
    value: String,
    unit: String
  },
  { _id: false }
);

const DetailedFeatureSchema = new Schema<IDetailedFeature>(
  {
    title: String,
    description: String
  },
  { _id: false }
);

const BadgeSchema = new Schema<IBadge>(
  {
    label: String,
    color: { type: String, default: "orange" }
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    slug:             { type: String, required: true, unique: true, index: true },
    name:             { type: String, required: true },
    category:         String,
    collectionId:     { type: Schema.Types.ObjectId, ref: "Collection" },
    price:            Number,
    images:           { type: [String], default: [] },
    heroImage:        String,
    shortDescription: String,
    longDescription:  String,
    specifications:       { type: [SpecSchema], default: [] },
    fullSpecifications:   { type: [SpecSchema], default: [] },
    features:             { type: [String], default: [] },
    detailedFeatures:     { type: [DetailedFeatureSchema], default: [] },
    highlightStats:       { type: [HighlightStatSchema], default: [] },
    badges:               { type: [BadgeSchema], default: [] },
    available:        { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);