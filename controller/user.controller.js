const User = require("../models/user.model");
exports.createUser = async (req, res, nex) => {
  const { email } = req.body;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    // Create new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    // User already exits
    res.json({
      success: false,
      message: "User Already Exits",
    });
  }
};
