import Project from '../models/project.model.js';
import mongoose from 'mongoose';

export const getProject = async (req, res) => {
    try {
        const projects = await Project.find({});
        res.status(200).json({ success: true, data: projects });
    } catch (error) {
        console.log("Error in finding the project", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const updateProject = async (req, res) => {
    const { id } = req.params;
    const project = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid project id" });
    }

    try {
        const updatedProject = await Project.findByIdAndUpdate(id, project, { new: true });
        res.status(200).json({ success: true, data: updatedProject });
    } catch (error) {
        console.error("Cannot update the project", error.message);
        res.status(500).json({ success: false, message: "server error" });
    }
}

export const deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        await Project.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Project Deleted" });
    } catch (error) {
        console.log("Error in deleting the product", error.message);
        res.status(404).json({ success: false, message: "Project not found" });
    }
}

export const createProject = async (req, res) => {
    const project = req.body;

    if(!project.name || !project.description || !project.skills) {
        return res.status(400).json({ success: false, message: "Please Provide all fields" });
    }

    const newProject = new Project(project);

    try {
        await newProject.save();
        res.status(201).json({ success: true, data: newProject });
    } catch (error) {
        console.error("Error in creating project:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
