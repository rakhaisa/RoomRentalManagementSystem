import Tenant from "../models/tenant.js";

export const getTenants = async (req, res) => {
    try {
        const tenants = await Tenant.find();
        res.json(tenants);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getTenantById = async (req, res) => {
    try {
        const tenant = await Tenant.findById(req.params.id);
        res.json(tenant);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
let sequenceNumber = 1;
export const saveTenant = async (req, res) => {
    const {
        name,
        email,
        dob,
        phoneNumber,
        gender,
        occupation,
        address,
        rentAmount,
        roomNo,
        departureDate,
        status,
      } = req.body;
    
      try {
        const paddedSequenceNumber = String(sequenceNumber).padStart(3, "0");
        const tenantID = `T${paddedSequenceNumber}`;
        sequenceNumber++; // Increment the sequence number for the next tenant

    
        const tenant = new Tenant({
          tenantID,
          name,
          email,
          dob,
          phoneNumber,
          gender,
          occupation,
          address,
          rentAmount,
          roomNo,
          departureDate,
          status,
        });
    
        const insertedTenant = await tenant.save();
        res.status(201).json(insertedTenant);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const updateTenant = async (req, res) => {
    try {
        const updatedtenant = await Tenant.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updatedtenant);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const deleteTenant = async (req, res) => {
    try {
        const deletedtenant = await Tenant.deleteOne({_id:req.params.id});
        res.status(200).json(deletedtenant);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}