import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Project from './models/project.model.js';
import mongoose from 'mongoose';
import cors from 'cors';
import projectRoutes from './routes/project.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Allows us to accept JSON data in the body
app.use(cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true, // Allow cookies and credentials
}));

// Routes
app.use("/api/projects", projectRoutes);

console.log(process.env.MONGO_URI);

app.listen(port, () => {
    connectDB();
    console.log("Server is running on port: ", port);
});

// 9KmrXOGwb4Nth7xK