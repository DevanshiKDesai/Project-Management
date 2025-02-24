import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Project from './models/project.model.js';
import mongoose from 'mongoose';
import projectRoutes from './routes/project.route.js';

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); //allows us to accept the json data in the body
app.use("/api/projects", projectRoutes)

console.log(process.env.MONGO_URI);

app.listen(port, () => {
    connectDB();
    console.log("Server is running on port: ", port);
});

// 9KmrXOGwb4Nth7xK