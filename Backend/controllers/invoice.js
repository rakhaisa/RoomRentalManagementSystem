import Payment from "../models/payment.js";
import Tenant from "../models/tenant.js";

const getInvoiceData = async (req, res) => {
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

  export { getInvoiceData };