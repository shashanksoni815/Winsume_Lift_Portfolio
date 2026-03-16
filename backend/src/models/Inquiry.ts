import mongoose, { Schema, Document } from "mongoose";

export interface IInquiry extends Document {
  externalId: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  subject?: string;
  message: string;
  type?: string;
  userId?: mongoose.Types.ObjectId;
  status: "new" | "in-review" | "responded" | "closed";
  priority: "low" | "medium" | "high";
  assignedToUserId?: mongoose.Types.ObjectId;
  source?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    externalId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    city: String,
    subject: String,
    message: { type: String, required: true },
    type: String,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["new", "in-review", "responded", "closed"],
      default: "new",
      index: true
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },
    assignedToUserId: { type: Schema.Types.ObjectId, ref: "User" },
    source: String
  },
  { timestamps: true }
);

InquirySchema.index({ status: 1, priority: 1, createdAt: -1 });

export const Inquiry = mongoose.model<IInquiry>("Inquiry", InquirySchema);

