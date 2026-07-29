import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    /* ---------- Conference info ---------- */
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    slug: { type: String, required: true, unique: true },
    type: {
      type: String,
      required: true,
      enum: ["کنفرانس", "ژورنال"],
    },

    tags: {
      type: [String],
      index: true,
      default: [],
    },

    year: {
      type: Number,
      required: true,
    },

    month: {
      type: Number,
      required: true,
      min: 0,
      max: 12,
    },

    country: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    keywords: {
      type: [String],
    },
    price: { type: Number, required: true },
    /* ---------- Slot status ---------- */
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
      index: true,
    },

    /* ---------- Optional relation ---------- */
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Product", productSchema);
