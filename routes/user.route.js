const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} = require("../controller/user.controller");
const {
  isAuthenticateUser,
  authorizeRoles,
} = require("../middlewares/authenticate.middleware");

const router = express.Router();

// User Routes
router.route("/register").post(isAuthenticateUser, createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

module.exports = router;
