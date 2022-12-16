const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error.middleware");
const morganBody = require("morgan-body");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

morganBody(app, {
  logReqDateTime: false,
  logReqUserAgent: false,
  logIP: false,
  maxBodyLength: 1024,
});

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
