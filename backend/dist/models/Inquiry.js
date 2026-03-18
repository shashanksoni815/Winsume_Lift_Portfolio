import mongoose, { Schema } from "mongoose";
const InquirySchema = new Schema({
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
}, { timestamps: true });
InquirySchema.index({ status: 1, priority: 1, createdAt: -1 });
export const Inquiry = mongoose.model("Inquiry", InquirySchema);
