import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const result = dotenv.config(); // Capture the result of dotenv.config()

if (result.error) {
  console.error("❌ Error loading .env file:", result.error);
} else {
  console.log("✅ .env file loaded successfully");
  console.log("Loaded environment variables:", result.parsed); // Log the parsed variables
}

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";

console.log("MongoDB URI:", process.env.MONGO_URI); // ✅ Debugging Step

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Database is connected");
  })
  .catch((err) => {
    console.log("❌ Database connection error:", err);
  });

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(5000, () => {
  console.log("🚀 Server is running on port 5000!");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
