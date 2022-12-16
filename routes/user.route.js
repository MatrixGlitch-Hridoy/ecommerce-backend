const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
} = require("../controller/user.controller");
const {
  isAuthenticateUser,
} = require("../middlewares/authenticate.middleware");

const router = express.Router();

// User Routes
router.route("/register").post(isAuthenticateUser, createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

module.exports = router;
