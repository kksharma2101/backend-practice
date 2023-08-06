import app from "./app";
import mongoose from "mongoose";

const PORT = 9901;

//database connect to mongodb
// mongoose.connect('mongodb://127.0.0.1:27017/test');

(async () => {
  try {
    // connect to mongoose
    await mongoose.connect("dbString");
    console.log("Database is connect successfully")

    app.on("error",() => {
        console.log("Error :",error);
        throw error;
    })
    app.listen(PORT,() => {
        console.log(`Server is running port :${PORT}`)
    });

  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
});

// app.listen(PORT, () => {
//   console.log(`Server is started on port :${PORT}`);
// });
