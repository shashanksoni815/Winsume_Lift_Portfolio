import mongoose, { Schema, Document } from "mongoose";

export interface IPasswordResetToken extends Document {
  userId: mongoose.Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
}

const PasswordResetTokenSchema = new Schema<IPasswordResetToken>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  tokenHash: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true, index: { expires: "0s" } },
  createdAt: { type: Date, default: Date.now }
});

export const PasswordResetToken = mongoose.model<IPasswordResetToken>(
  "PasswordResetToken",
  PasswordResetTokenSchema
);

