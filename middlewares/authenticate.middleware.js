const ErrorHandler = require("../utils/error-handler.util");
const catchAsyncErrors = require("./catch-async-errors.middleware");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.isAuthenticateUser = catchAsyncErrors(async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodedData = jwt.verify(accessToken, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
