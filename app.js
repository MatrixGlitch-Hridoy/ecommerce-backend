const express = require("express");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middlewares/error");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports
const user = require("./routes/user.route");
app.use("/api/v1/user", user);

// 404 error handler
// app.use((req, res, next) => {
//   res.status(404).json({
//     success: false,
//     message: "Requested url was not found",
//   });
// });

//Middleware for errors
app.use(errorMiddleware);

module.exports = app;
