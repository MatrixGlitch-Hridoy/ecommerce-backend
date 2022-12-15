const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports
const user = require("./routes/user.route");
app.use("/api/v1/user", user);

module.exports = app;
