const otpServices = require("../services/otp.service");
const otpController = require("../controllers/otp.controller");
const OtpModel = require("../models/otp.model");
const UserModel = require("../models/user.model");
const sendOTP = require("../utils/sendEmail");
const sendResponse = require("../utils/sendResponse");

const otpServiceInstance = otpServices({ OtpModel, UserModel, sendOTP, sendResponse });
const otpControllerInstance = otpController(otpServiceInstance);

module.exports = otpControllerInstance;
