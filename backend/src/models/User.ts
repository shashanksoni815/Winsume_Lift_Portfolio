import mongoose, { Schema, Document } from "mongoose";

export type UserRole = "admin" | "manager" | "user";

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  role: UserRole;
  status: "active" | "inactive" | "suspended";
  fullName: string;
  phone?: string;
  company?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  department?: string;
  joinDate?: Date;
  totalProjects?: number;
  activeProjects?: number;
  completedProjects?: number;
  createdAt: Date;
  updatedAt: Date;
  lastActive?: Date;
}

const UserSchema = new Schema<IUser>(
  {
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
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);

