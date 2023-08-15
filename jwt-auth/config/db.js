const mongoose = require("mongoose");

const connectToDb = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((conn) => {
      console.log(`DB connect successfully ${conn.connection.host}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = connectToDb;
