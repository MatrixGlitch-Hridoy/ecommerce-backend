const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//Config
dotenv.config({ path: "config/config.env" });

// Database Connection
connectDatabase();
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
