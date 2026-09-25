import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.NODE_ENV === "production"
        ? process.env.MONGODB_URI
        : process.env.MONGODB_LOCAL;
    console.log("MONGO URI:", mongoURI);

    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ Connected to MongoDB: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
