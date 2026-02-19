import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Order from "../models/order.model.js";

dotenv.config();

const seedOrder = async () => {
  try {
    await connectDB();

    await Order.deleteMany();

    const order = await Order.create({
      title:
        "Clinical Pain Alleviation and Reduction Based on Hypnosis Approaches",
      type: "کنفرانس",
      tags: "روان شناسی",
      year: 2026,
      date: "2024-02",
      location: "ملبورن استرالیا",
      country: "Australia",
      countryCode: "AU",
      flag: "🇦🇺",
      status: "Open",
      images: [
        {
          url: "https://res.cloudinary.com/demo/image/upload/v1/cer/australia1.jpg",
          public_id: "cer/australia1",
        },
      ],
      link: "https://civilica.com/doc/1944466/",
      keywords:
        "Hypnosis, Pain Reduction, Treatment, Clinical Pain Relief, Pain Alleviation",
    });

    console.log("✅ Order seeded successfully");
    console.log(order);

    process.exit();
  } catch (error) {
    console.error("❌ Order seed failed:", error.message);
    process.exit(1);
  }
};

seedOrder();
