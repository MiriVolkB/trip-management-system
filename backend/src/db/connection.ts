import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_URI is not defined in .env file");
}



export async function connectDB() {
  try {
    await mongoose.connect(uri!);
    console.log("✅ Connected to MongoDB with Mongoose!");
  } catch (err) {
    console.error("❌ DB connection error:", err);
    throw err;
  }
}