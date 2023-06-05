import Payment from "../models/payment.js";
import  Tenant from "../models/tenant.js";


export const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        res.json(payment);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
let sequenceNumber = 1;
export const savePayment = async (req, res) => {
    const {
        tenantID,
        rentAmount,
        roomNo,
        period,
        paymentType,
        paymentDate,
        } = req.body;
    
    try {
        const paddedSequenceNumber = String(sequenceNumber).padStart(3, "0");
        const rentId = `P${paddedSequenceNumber}`;
        sequenceNumber++; // Increment the sequence number for the next tenant

        const Payments = new Payment({
            tenantID,
            rentId,
            rentAmount,
            roomNo,
            period,
            paymentType,
            paymentDate,
          });
        const insertedPayment = await Payments.save();
        res.status(201).json(insertedPayment);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const updatePayment = async (req, res) => {
    try {
        const updatedpayment = await Payment.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updatedpayment);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const deletePayment = async (req, res) => {
    try {
        const deletedpayment = await Payment.deleteOne({_id:req.params.id});
        res.status(200).json(deletedpayment);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
export const getInvoiceData = async (req, res) => {
    try {
      const { tenantID } = req.params;
  
      // Find the tenant based on the provided tenantID
      const tenant = await Tenant.findOne({ tenantID });
  
      if (!tenant) {
        return res.status(404).json({ error: 'Tenant not found' });
      }
  
      // Find the payment data based on the tenantID
      const payment = await Payment.findOne({ tenantID });
  
      if (!payment) {
        return res.status(404).json({ error: 'Payment data not found' });
      }
  
      // Extract the required data
      const { name, email } = tenant;
      const { rentId, rentAmount, roomNo, period, paymentType, paymentDate } = payment;
  
      // Construct the invoice object
      const invoice = {
        name,
        rentId,
        rentAmount,
        roomNo,
        period,
        email,
        paymentType,
        paymentDate,
      };
  
      // Return the invoice data
      return res.json({ invoice });
    } catch (error) {
      console.error('Error retrieving invoice data:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
