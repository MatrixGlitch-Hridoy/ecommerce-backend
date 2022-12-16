const User = require("../models/user.model");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
exports.createUser = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    // Create new user
    const newUser = await User.create(req.body);
    res.status(201).json({
      success: true,
      newUser,
    });
  } else {
    // User already exits
    return next(new ErrorHandler("User Already Exits", 409));
  }
});
