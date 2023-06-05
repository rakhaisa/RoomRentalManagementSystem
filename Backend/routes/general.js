import express from "express";
import { getDashboard } from "../controllers/dashboard.js";
import{ getTask, getTaskById, createTask, deleteTask } from "../controllers/task.js";



const router = express.Router();

router.get('/dashboard', getDashboard);
router.get('/task', getTask);
router.get('/task/:id', getTaskById);
router.post('/task', createTask);
router.delete('/task/:id', deleteTask);

export default router;