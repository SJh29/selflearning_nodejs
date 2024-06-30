const mongoose = require("mongoose");
const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    })
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log(err.message);
    });
  mongoose.connection.on("connected", () => {
    console.log("Mongoose Connected to DB");
  });
};

module.exports = connectDB;
