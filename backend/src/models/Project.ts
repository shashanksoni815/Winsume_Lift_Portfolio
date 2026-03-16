import mongoose, { Schema, Document } from "mongoose";

interface ISpec {
  label: string;
  value: string;
}

interface ITestimonial {
  quote: string;
  author?: string;
  company?: string;
}

export interface IProject extends Document {
  externalId: string;
  name: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  clientId?: mongoose.Types.ObjectId;
  location?: string;
  status: "completed" | "in-progress" | "pending" | "on-hold";
  budget?: number;
  spent?: number;
  startDate?: Date;
  endDate?: Date;
  progress?: number;
  teamSize?: number;
  type?: string;
  image?: string;
  // portfolio fields
  title?: string;
  category?: string;
  year?: number;
  description?: string;
  challenge?: string;
  solution?: string;
  specifications?: ISpec[];
  testimonial?: ITestimonial;
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

const TestimonialSchema = new Schema<ITestimonial>(
  {
    quote: { type: String, required: true },
    author: String,
    company: String
  },
  { _id: false }
);

const ProjectSchema = new Schema<IProject>(
  {
    externalId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    clientName: String,
    clientEmail: String,
    clientPhone: String,
    clientId: { type: Schema.Types.ObjectId, ref: "User" },
    location: String,
    status: {
      type: String,
      enum: ["completed", "in-progress", "pending", "on-hold"],
      default: "pending",
      index: true
    },
    budget: Number,
    spent: Number,
    startDate: Date,
    endDate: Date,
    progress: Number,
    teamSize: Number,
    type: String,
    image: String,
    title: String,
    category: String,
    year: Number,
    description: String,
    challenge: String,
    solution: String,
    specifications: { type: [SpecSchema], default: [] },
    testimonial: TestimonialSchema
  },
  { timestamps: true }
);

ProjectSchema.index({ status: 1, type: 1 });

export const Project = mongoose.model<IProject>("Project", ProjectSchema);

