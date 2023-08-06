import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is require"],
    maxLenagth: [20, "Name should be less then 20 character"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is require"],
  },
  username: {
    type: String,
    unique: true,
  },
  registerd: {
    type: Date,
    index: true,
  },
  password: String,
});

export default mongoose.model("User", userSchema);
