require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("../routers/userRouters");
const connectToDb = require("../config/db");
const cookieParser = require("cookie-parser");

const app = express();
// express middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env,
    credentials: true,
  })
);

//
app.use("/", router);

// connect database
connectToDb();

module.exports = app;
