import Task from "../models/task.js";
import moment from "moment";

export const getTask = async (req, res) => {
    try {
        const tasks = await Task.find(
            {start : {$gte: moment(req.query.start).toDate()},
            end : {$lte: moment(req.query.end).toDate()},
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.json(task);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createTask = async (req, res) => {
    const tasks = new Task(req.body);
    try {
        const insertedTask = await tasks.save();
        res.status(201).json(insertedTask);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const deleteTask = async (req, res) => {
    try {
        const deletedtask = await Tenant.deleteOne({_id:req.params.id});
        res.status(200).json(deletedtask);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}