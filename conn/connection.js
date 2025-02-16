import mongoose from "mongoose"; 
import dotenv from "dotenv";

dotenv.config(); // ✅ Load Environment Variables

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("❌ MongoDB URI is missing. Check your .env file.");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI,);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

export default connectDB; // ✅ Fix: Exporting correctly
