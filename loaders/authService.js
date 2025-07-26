const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");
const sendOTP = require("../utils/sendOTP");
const generateToken = require("../utils/generateToken");
const generateRefreshToken = require("../utils/generateRefreshToken");
// const generateToken = (payload) => {
//   return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
// };

// const generateRefreshToken = (payload) => {
//   return jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: "7d" });
// };

const authServiceFactory = require("../services/auth.service");

const authService = authServiceFactory(
  User,
  bcrypt,
  generateToken,
  generateRefreshToken,
  sendEmail,
  sendOTP
);

module.exports = authService;
