import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    /* ---------- Conference info ---------- */
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    type: {
      type: String,
      enum: ["کنفرانس", "ژورنال"],
      required: true,
    },

    tags: {
      type: String,
      index: true,
    },

    year: {
      type: Number,
      required: true,
    },

    date: {
      type: String, // "2024-02"
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    countryCode: {
      type: String,
      uppercase: true,
      minlength: 2,
      maxlength: 3,
    },

    flag: {
      type: String,
      default: "",
    },

    images: [
      {
        url: String,
        public_id: String,
      },
    ],

    link: {
      type: String,
    },

    keywords: {
      type: String,
    },

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

export default mongoose.model("Order", orderSchema);
