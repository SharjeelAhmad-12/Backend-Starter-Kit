const authServiceFactory = require("../services/auth.service");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenUtils = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");
const sendOTP = require("../utils/sendOTP");

const authService = authServiceFactory({
  User,
  bcrypt,
  jwt,
  tokenUtils,
  sendEmail,
  sendOTP,
});

module.exports = authService;
