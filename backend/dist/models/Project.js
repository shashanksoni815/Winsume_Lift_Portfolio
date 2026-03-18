import mongoose, { Schema } from "mongoose";
const SpecSchema = new Schema({
    label: String,
    value: String
}, { _id: false });
const TestimonialSchema = new Schema({
    quote: { type: String, required: true },
    author: String,
    company: String
}, { _id: false });
const ProjectSchema = new Schema({
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
}, { timestamps: true });
ProjectSchema.index({ status: 1, type: 1 });
export const Project = mongoose.model("Project", ProjectSchema);
