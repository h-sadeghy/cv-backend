// scripts/seedAdmin.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/admin.model.js"; // adjust path

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODBNEW);

    const email = process.env.SEED_ADMIN_EMAIL || "iman@admin.com";
    const password = process.env.SEED_ADMIN_PASSWORD || "123123123";
    const name = process.env.SEED_ADMIN_NAME || "Super Admin";

    const exists = await Admin.findOne({ email });
    if (exists) {
      console.log("Admin already exists:", email);
      process.exit(0);
    }

    const hash = await bcrypt.hash(password, 10);

    await Admin.create({
      name,
      email,
      password: hash,
      role: "admin",
      isActive: true,
    });

    console.log("✅ Admin seeded");
    console.log("email:", email);
    console.log("password:", password);
    process.exit(0);
  } catch (e) {
    console.error("❌ Seed failed:", e.message);
    process.exit(1);
  }
};

seed();
