import express from "express";
import dotenv from "dotenv";
import connectDB from "./conn/connection.js"; // ✅ Import MongoDB Connection
import userRoutes from "./routes/user.js"; // ✅ Importing Correct Routes File
import book from "./routes/book.js"
import favourite from "./routes/favourite.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 1000;

connectDB(); 

app.use(express.json());

app.use("/api/v1", userRoutes);
app.use("/api/v1", book);
app.use("/api/v1", favourite);



app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
