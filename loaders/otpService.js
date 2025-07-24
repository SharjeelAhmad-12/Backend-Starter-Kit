const otpServices = require("../services/otp.service");
const otpController = require("../controllers/otpController");
const OtpModel = require("../models/otp");
const UserModel = require("../models/user");
const sendOTP = require("../utils/sendEmail");
const sendResponse = require("../utils/sendResponse");

const otpServiceInstance = otpServices({ OtpModel, UserModel, sendOTP, sendResponse });
const otpControllerInstance = otpController(otpServiceInstance);

module.exports = otpControllerInstance;
