import express from "express";
import dotenv from "dotenv";
import connectDB from "./conn/connection.js"; // ✅ Import MongoDB Connection
import userRoutes from "./routes/user.js"; // ✅ Importing Correct Routes File

dotenv.config();
const app = express();
const PORT = process.env.PORT || 1000;

connectDB(); // ✅ Connect to MongoDB

app.use(express.json()); // ✅ JSON Middleware

// ✅ Sahi API Route Register Karein
app.use("/api/v1", userRoutes); // ✅ "api" spelling check karein!

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
