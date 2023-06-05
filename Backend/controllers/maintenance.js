import Maintenance from "../models/maintenance.js";


export const getMaintenances = async (req, res) => {
    try {
        const maintenances = await Maintenance.find();
        res.json(maintenances);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getMaintenanceById = async (req, res) => {
    try {
        const maintenance = await Maintenance.findById(req.params.id);
        res.json(maintenance);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const saveMaintenance = async (req, res) => {
    const maintenances = new Maintenance(req.body);
    try {
        const insertedMaintenance = await maintenances.save();
        res.status(201).json(insertedMaintenance);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const updateMaintenance = async (req, res) => {
    try {
        const updatedmaintenance = await MaintenanceupdateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updatedmaintenance);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const deleteMaintenance = async (req, res) => {
    try {
        const deletedmaintenance = await Maintenance.deleteOne({_id:req.params.id});
        res.status(200).json(deletedmaintenance);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}