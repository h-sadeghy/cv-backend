import mongoose from "mongoose";
import dotenv from "dotenv";
import certificates from "./certificates.js";
import Certificate from "../models/certificate.model.js";
import slugify from "slugify";
dotenv.config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("→ Connected to MongoDB");

    await Certificate.deleteMany({});
    console.log("→ Old certificates removed");
    const dataToInsert = certificates.map((item) => {
      const slug = slugify(item.title, {
        lower: true,
        strict: true,
        trim: true,
      });

      return {
        title: item.title,
        slug, // ← add this
        type: "conference",
        tags: Array.isArray(item.tags) ? item.tags : [],
        description: item.description,
        seen: item.seen ?? 0,
        date: new Date(`${item.date}-01`),
        location: item.location,
        countryCode: item.countryCode,
        images: Array.isArray(item.images) ? item.images : [],
        link: item.link,
        keywords: Array.isArray(item.keywords)
          ? item.keywords.map((k) => k.trim())
          : [],
      };
    });

    const result = await Certificate.insertMany(dataToInsert);
    console.log(`★ Inserted ${result.length} certificates`);

    await mongoose.connection.close();
    console.log("→ Done");
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seedDatabase();
