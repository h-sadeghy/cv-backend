import mongoose from "mongoose";
import slugify from "slugify";

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["conference", "journal", "workshop"],
      default: "conference",
      index: true,
    },

    tags: {
      type: [String],
      index: true,
      default: [],
    },

    description: {
      type: String,
      required: true,
      maxlength: 8000,
    },

    seen: {
      type: Number,
      default: 0,
    },

    date: {
      type: Date,
      required: true,
      index: true,
    },

    location: {
      type: String,
      trim: true,
    },

    countryCode: {
      type: String,
      uppercase: true,
      minlength: 2,
      maxlength: 2,
      index: true,
    },

    images: {
      type: [String], // Cloudinary URLs (f_auto,q_auto already good)
      default: [],
    },

    link: {
      type: String,
      required: true,
    },

    keywords: {
      type: [String],
      default: [],
      index: true,
    },
  },
  { timestamps: true },
);

/* 🔥 Auto-generate slug */

certificateSchema.pre("save", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      trim: true,
    });
  }
  next();
});

export default mongoose.model("Certificate", certificateSchema);
