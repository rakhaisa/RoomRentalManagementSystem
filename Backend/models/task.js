import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    start: Date,
    end: Date,
    titte: String,
    category: String,
    completed: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true }
    );
  
const Task = mongoose.model('Task', taskSchema);
export default Task;