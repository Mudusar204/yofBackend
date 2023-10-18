const express = require("express");
const app = express();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

exports.isAuthenticated = async (req, res, next) => {
  console.log(
    req.cookies,
    "==============cookies=========Route chala========="
  );
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded, "decoded");
    req.user = await User.findById(decoded._id);

    next();
  } catch (error) {
    console.log(error,"error aaya in auth component while cookie get");
    res.status(500).json({
      message: error.message,
      
    });
  }
};


