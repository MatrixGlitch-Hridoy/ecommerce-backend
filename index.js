const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
});

//Config
dotenv.config({ path: "config/config.env" });

// Database Connection
connectDatabase();
const PORT = process.env.PORT || 5002;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`ErrorL ${err.message}`);
  console.log(`Shutting down the server due to Unhandle Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
