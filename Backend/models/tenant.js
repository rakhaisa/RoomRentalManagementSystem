import mongoose from "mongoose";

const TenantSchema = new mongoose.Schema(
  {
    tenantID: {
      type: String,
      required: true,
      },
    name:{
        type: String,
        required: true
    },
    email: {
      type: String,
      required: true,
      },
    dob:{
      type: Date,
      required: true
  },
    phoneNumber:{
      type: String,
      required: true
  },
    gender:{
      type: String,
      required: true
  },
  occupation:{
    type: String,
    required: true
},
    address:{
      type: String,
      required: true
  },
    rentAmount:{
    type: Number,
    
},
    roomNo: {
      type: String,
  },
  departureDate: {
    type: Date,
    required: true
},
  status: {
    type: String,
    required: true
},
  },
  { timestamps: true }
);

const Tenant = mongoose.model("Tenant", TenantSchema);
export default Tenant;