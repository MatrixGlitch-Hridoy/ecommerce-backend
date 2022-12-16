const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const connectDatabase = () => {
  mongoose.connect(process.env.DB_URL).then((database) => {
    console.log(`Mongodb connected with server : ${database.connection.host}`);
  });
};

module.exports = connectDatabase;
