const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: [true, "Name is mandatory"],
    },
    email: {
      type: String,
      // unique: true,
      // required: true,
      lowerCase: true,
    },
    password: {
      type: String,
      // unique: true,
      select: false,
      minLength: [8, "minimum length 8"],
    },
    forgotPasswordToken: {
      type: String,
      // unique: true,
      minLength: [8, "minimum length 8"],
    },
    age: {
      type: Number,
      minLength: 18,
      maxLength: 70,
    },
    forgotPasswordExpiryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

userSchema.method = function jwtToken() {
  jwt.sign({ id: this._id }, process.env.SECRET, {
    expiresIn: "24h",
  });
};

module.exports = mongoose.model("User", userSchema);
