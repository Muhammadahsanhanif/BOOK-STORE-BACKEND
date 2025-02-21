import express from "express";
import dotenv from "dotenv";
import connectDB from "./conn/connection.js"; // ✅ Import MongoDB Connection
import userRoutes from "./routes/user.js"; // ✅ Importing Correct Routes File

dotenv.config();
const app = express();
const PORT = process.env.PORT || 1000;

connectDB(); 

app.use(express.json());

app.use("/api/v1", userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
