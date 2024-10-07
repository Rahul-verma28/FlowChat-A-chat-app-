import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/AuthRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Nice working");
});

// Start the server
const server = app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
