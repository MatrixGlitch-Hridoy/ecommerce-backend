const express = require("express");
const { createUser, loginUser } = require("../controller/user.controller");

const router = express.Router();

// User Routes
router.route("/register").post(createUser);
router.route("/login").post(loginUser);

module.exports = router;
