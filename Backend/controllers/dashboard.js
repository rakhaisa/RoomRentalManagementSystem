import Payment from "../models/payment.js";
import Tenant from "../models/tenant.js";
import Room from "../models/room.js";
import Message from "../models/message.js";
import Maintenance from "../models/maintenance.js";
//import Invoice from "../models/invoice.js";

export const getDashboard = async (req, res) => {
  try {
    /* Calculate additional stats */
    const totalTenant = await Tenant.countDocuments({ status: 'Active' });
    const totalVacantRoom = await Room.countDocuments({ status: 'Available' });

    // Calculate total emails
    const totalEmail = await Message.countDocuments();
    const totalInvoice = await Payment.countDocuments();

    // Calculate monthly payment
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    
    const monthlyPayment = await Payment.aggregate([
      {
        $group: {
          _id: { month: { $month: "$paymentDate" }, year: { $year: "$paymentDate" } },
          monthlyPayment: { $sum: "$rentAmount" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    const monthlyMaintenance = await Maintenance.aggregate([
      {
        $group: {
          _id: { month: { $month: "$maintDate" }, year: { $year: "$maintDate" } },
          monthlyMaintenance: { $sum: "$maintAmount" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);
    
  
    
    const monthNames = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
    ];

    const monthlyPaymentArray = [];

    for (let month = 1; month <= 12; month++) {
  const payment = monthlyPayment.find(p => p._id.month === month);
  const totalPayment = payment ? payment.monthlyPayment : 0;
  const monthName = monthNames[month - 1];
  monthlyPaymentArray.push({ month: monthName, totalPayment });
    }

    const monthlyMaintArray = [];
    for (let month = 1; month <= 12; month++) {
      const maintenance = monthlyMaintenance.find(p => p._id.month === month);
      const totalMaintenance = maintenance ? maintenance.monthlyMaintenance : 0;
      const monthName = monthNames[month - 1];
      monthlyMaintArray.push({ month: monthName, totalMaintenance });
        }


// Calculate yearly payment total
const yearlyPaymentTotal = await Payment.aggregate([
  {
    $match: {
      paymentDate: { $gte: new Date(currentYear, 0, 1) },
    },
  },
  {
    $group: {
      _id: { year: { $year: "$paymentDate" } },
      yearlyPaymentTotal: { $sum: "$rentAmount" },
    },
  },
]);

const yearlyPaymentData = yearlyPaymentTotal.reduce((acc, entry) => {
  acc[entry._id.year.toString()] = entry.yearlyPaymentTotal;
  return acc;
}, {});

// Calculate yearly maintenance total
const yearlyMaintenanceTotal = await Maintenance.aggregate([
  {
    $match: {
      maintDate: { $gte: new Date(currentYear, 0, 1) },
    },
  },
  {
    $group: {
      _id: { year: { $year: "$maintDate" } },
      yearlyMaintenanceTotal: { $sum: "$maintAmount" },
    },
  },
]);

const yearlyMaintenanceData = yearlyMaintenanceTotal.reduce((acc, entry) => {
  acc[entry._id.year.toString()] = entry.yearlyMaintenanceTotal;
  
  return acc;
}, {});

    res.status(200).json({
      totalTenant,
      totalVacantRoom,
      totalEmail,
      totalInvoice,
      monthlyPaymentArray,
      monthlyMaintArray,
      yearlyPaymentData,
      yearlyMaintenanceData,
      yearlyPaymentTotal,
      yearlyMaintenanceTotal,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


