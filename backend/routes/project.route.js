import express from 'express';
import Project from '../models/project.model.js';
import mongoose from 'mongoose'
import { createProject, deleteProject, getProject, updateProject } from '../controllers/project.controller.js';
const router = express.Router();

router.post('/', createProject);
router.delete('/:id', deleteProject);
router.put('/:id', updateProject);
router.get('/', getProject);

export default router;