const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your first name"],
    maxLength: [20, "First name cannot exceed 20 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your last name"],
    maxLength: [20, "Last name cannot exceed 20 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validator: [validator.isEmail, "Please enter a valid email"],
  },
  phone: {
    type: String,
    required: [true, "Please enter your phone number"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [6, "Password should be greater than 6 characters"],
    select: false,
  },
});

module.exports = mongoose.model("User", userSchema);
