const User = require("../models/user.model");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendAccessToken = require("../utils/jwt-token");

// Register New User
exports.createUser = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, password, phone } = req.body;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    // Create new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      avatar: {
        public_id: "This is sample id",
        url: "profilePicUrl",
      },
    });
    sendAccessToken(newUser, 201, res);
  } else {
    // User already exits
    return next(new ErrorHandler("User Already Exits", 409));
  }
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  // Checking if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  // Checking if user exits or not
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  // Checking if password matched or not
  const isPasswordMatched = user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendAccessToken(user, 200, res);
});
