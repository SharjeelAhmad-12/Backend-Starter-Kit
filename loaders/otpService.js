const OtpModel = require("../models/otp");
const UserModel = require("../models/user");
const sendOTP = require("../utils/sendEmail");
const createOtpService = require("../services/otp.service");

const otpService = createOtpService({ OtpModel, UserModel, sendOTP });
module.exports = otpService;