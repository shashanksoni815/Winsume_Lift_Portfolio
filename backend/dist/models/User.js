import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "manager", "user"], default: "user" },
    status: { type: String, enum: ["active", "inactive", "suspended"], default: "active" },
    fullName: { type: String, required: true },
    phone: String,
    company: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    department: String,
    joinDate: Date,
    totalProjects: Number,
    activeProjects: Number,
    completedProjects: Number,
    lastActive: Date
}, { timestamps: true });
export const User = mongoose.model("User", UserSchema);
