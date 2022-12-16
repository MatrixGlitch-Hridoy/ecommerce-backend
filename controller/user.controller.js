const User = require("../models/user.model");
const ErrorHandler = require("../utils/error-handler.util");
const catchAsyncErrors = require("../middlewares/catch-async-errors.middleware");
const sendAccessToken = require("../utils/jwt-token.util");
const sendEmail = require("../utils/send-email.util");

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

// Logout User
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("accessToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  // Get Reset Password Token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/password/reseet${resetToken}`;

  const message = `Your password reset token is: \n\n ${resetPasswordUrl} \n\n If you not requested this url then please ignore.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} successfully.`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendAccessToken(user, 200, res);
});
