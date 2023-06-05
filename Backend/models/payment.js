import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    tenantID: {
      type: String,
      required: true,
      },
    rentId:{
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
  paymentDate: {
    type: Date,
    required: true
},
paymentType: {
  type: String,
  required: true
},
  period: {
    type: String,
    required: true
},
invoice: {
  type: String,
},
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentSchema);
export default Payment;