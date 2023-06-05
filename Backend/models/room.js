import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    tenantID: {
      type: String,
      },
    rentAmount:{
    type: Number,
    required: true
    },
    roomNo: {
      type: String,
      required: true
  },
  roomType: {
    type: String,
    required: true
},
  status: {
    type: String,
    default: "available",
},
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", RoomSchema);
export default Room;