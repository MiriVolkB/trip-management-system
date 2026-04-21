import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_URI is not defined in .env file");
}

const client = new MongoClient(uri);

export async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB successfully!");

    return client.db("tripDB"); // תשני לשם הדאטהבייס שלך אם צריך
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}