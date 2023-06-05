import Room from "../models/room.js";
import Tenant from "../models/tenant.js";

export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
    const tenants = await Tenant.find();
    const updatedRooms = rooms.map((room) => {
        const tenant = tenants.find((tenant) => tenant.roomNo === room.roomNo);
  
        if (tenant) {
          room.status = "Unavailable";
          room.tenantID = tenant.tenantID;
        } else {
          room.status = "Available";
          room.tenantID = "-";
        }
  
        return room;
      });
  
     // Update the rooms in the database
    const updateOperations = updatedRooms.map((room) => ({
        updateOne: {
          filter: { _id: room._id },
          update: {
            $set: {
              status: room.status,
              tenantID: room.tenantID,
            },
          },
        },
      }));
  
      await Room.bulkWrite(updateOperations);

      res.json(updatedRooms);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        res.json(room);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getRoomByRoomNo = async (req, res) => {
    try {
        const room = await Room.findOne({ roomNo: req.params.roomNo });
        res.json(room);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const saveRoom = async (req, res) => {
    const rooms = new Room(req.body);
    try {
        const insertedRoom = await rooms.save();
        res.status(201).json(insertedRoom);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const updateRoom = async (req, res) => {
    try {
        const updatedroom = await Room.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updatedroom);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const deleteRoom = async (req, res) => {
    try {
        const deletedroom = await Room.deleteOne({_id:req.params.id});
        res.status(200).json(deletedroom);
    } catch (error) {
        res.status(400).json({message: error.message});
    }

}

