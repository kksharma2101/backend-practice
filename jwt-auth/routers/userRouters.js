const express = require("express");
const {
  home,
  signUp,
  signIn,
  getUser,
  logout,
} = require("../../backend-practice/jwt-auth/controllers/userControllers");
const jwtAuth = require("../../backend-practice/jwt-auth/middleware/jwtAuth");

const router = express.Router();

//
router.get("/", home);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/getuser", jwtAuth, getUser);
router.get("/logout", jwtAuth, logout);

module.exports = router;
