import mongoose, { Schema } from "mongoose";
const PasswordResetTokenSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    tokenHash: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true, index: { expires: "0s" } },
    createdAt: { type: Date, default: Date.now }
});
export const PasswordResetToken = mongoose.model("PasswordResetToken", PasswordResetTokenSchema);
