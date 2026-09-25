import crypto from "crypto";
import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productSnapshot: {
      title: { type: String, required: true },
      type: { type: String, required: true },
      year: { type: String, required: true },
      month: { type: String, required: true },
      country: { type: String, required: true },
      slug: { type: String, required: true },
      price: { type: Number, required: true },
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    totalPrice: { type: Number, required: true },
    customer: {
      fullName: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      email: { type: String, trim: true, lowercase: true, default: null },
      province: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      postalCode: { type: String, trim: true, default: null },
      info: { type: String, trim: true, default: null, maxlength: 1000 },
    },
    selectedOptionsSnapshot: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
      },
    ],
    status: {
      type: String,
      enum: [
        "pending_payment",
        "paid",
        "processing",
        "completed",
        "cancelled",
        "refunded",
        "failed",
      ],
      default: "pending_payment",
      index: true,
    },
    payment: {
      gateway: {
        type: String,
        default: null,
      },
      refId: { type: String, default: null },
      authority: { type: String, default: null },
      paidAt: { type: Date, default: null },
      verifiedAt: { type: Date, default: null },
    },
    orderCode: {
      type: String,
      unique: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  },
  { timestamps: true },
);

orderSchema.index({ _id: 1, "customer.phone": 1 });
orderSchema.index({ "customer.phone": 1 });
orderSchema.index({ "payment.authority": 1 });
orderSchema.pre("save", async function () {
  if (!this.orderCode) {
    this.orderCode =
      "ORD-" + crypto.randomBytes(4).toString("hex").toUpperCase();
  }
});
export default mongoose.model("Order", orderSchema);
