import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
    tenantID: String,
    email: String,
    messageDate: Date,
    subject: String,
    category: String,
    text: String,
    },
    { timestamps: true }
    );
  
const Message = mongoose.model('Email', emailSchema);
export default Message;
  