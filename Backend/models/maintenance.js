import mongoose from "mongoose";

const MaintenSchema = new mongoose.Schema(
  {
    maintenanceID: {
      type: String,
      required: true,
      },
    description:{
      type: String,
      required: true
  },
    maintAmount:{
    type: Number,
    required: true
},
    maintDate: {
      type: Date,
      required: true
  },
  details: {
    type: String,
    required: true
},
 
  },
  { timestamps: true }
);

const Maintenance = mongoose.model("Maintenance", MaintenSchema);
export default Maintenance;