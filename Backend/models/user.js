import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		min: 2,
		max: 50,
	  },
	  lastName: {
		type: String,
		required: true,
		min: 2,
		max: 50,
	  },
	  businessName: {
		type: String,
		required: true,
		min: 2,
		max: 50,
	  },
	  email: {
		type: String,
		required: true,
		max: 50,
		unique: true,
	  },
	  password: {
		type: String,
		required: true,
		min: 5,
	  },
	  picturePath: {
		type: String,
		default: "",
	  },
	  address: String,
	  occupation: String,
	  phoneNumber: String,
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("User", userSchema);
export default User;