import mongoose, { Schema } from "mongoose";
const CartItemSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    category: String,
    price: { type: Number, required: true },
    image: String,
    specifications: String,
    quantity: { type: Number, required: true, min: 1, default: 1 }
}, { _id: true });
const CartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    items: { type: [CartItemSchema], default: [] },
    status: { type: String, enum: ["open", "submitted", "cancelled"], default: "open" }
}, { timestamps: true });
CartSchema.index({ userId: 1, status: 1 });
export const Cart = mongoose.model("Cart", CartSchema);
