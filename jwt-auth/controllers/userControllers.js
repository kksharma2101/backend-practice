// const { json } = require("express");
const User = require("../../../backend/models/userSchema");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const middleware = require("../middleware/jwtAuth");

const home = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to home page",
  });
};
// signUp controllers
const signUp = async (req, res, next) => {
  const { name, email, password, confirmPassword, age } = req.body;
  // console.log(name, email, password, confirmPassword);
  if (!email || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Every field is required",
    });
  }
  const validEmail = emailValidator.validate(email);
  if (!validEmail) {
    return res.status(401).json({
      success: false,
      message: "Enter validate email",
    });
  }
  if (password !== confirmPassword) {
    return res.status(401).json({
      success: false,
      message: "Password is dosen't match",
    });
  }
  try {
    const user = await User.create({
      name,
      email,
      password,
      confirmPassword,
      age,
    });
    return res.status(200).json({
      success: true,
      message: "user signUp is successfull",
      data: user,
    });
  } catch (error) {
    if (error.code == 11000) {
      return res.status(401).json({
        success: false,
        message: "This email is already exists",
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  next();
};

// signIn code
const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Every field is mandatory",
    });
  }
  try {
    const user = await User.findOne({
      email,
    }).select("+password");

    // password !== user.password

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        success: false,
        message: "invalid passwords",
      });
    }

    const token = await user.jwtToken;

    user.password = undefined;
    const cookieOption = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      // secure:true
    };

    res.cookie("token", token, cookieOption);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};
// getUser controllers
const getUser = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    return res.status(200).json({
      success: true,
      message: "Get user data",
      data: user,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};
// logout controllers
const logout = async (req, res) => {
  try {
    const cookieOption = {
      expiry: new Date(),
      httponly: true,
    };
    res.cookie("token", null, cookieOption);
    res.status(200).json({
      success: true,
      message: "User logout successfully",
    });
  } catch (e) {
    return res.status(400).json({
      success: true,
      message: e.message,
    });
  }
};

module.exports = { home, signUp, signIn, getUser, logout };
