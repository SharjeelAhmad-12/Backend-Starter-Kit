const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const sendResponse = require("../utils/sendResponse");
const sendEmail = require("../utils/sendEmail");
const sendOTP = require("../utils/sendOTP");

const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return sendResponse(res, 400, false, "Email already in use");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
     
    });
    await sendOTP(newUser._id, newUser.email);

    const token = generateToken({
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    });

    sendResponse(res, 201, true, "User Registered Successfully", {
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return sendResponse(res, 404, false, "User Not Found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return sendResponse(res, 401, false, "Invalid Credentials");

    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    sendResponse(res, 200, true, "Login Successful", {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return sendResponse(res, 404, false, "User Not Found");

    const otp = Math.floor(1000 + Math.random() * 9000);
    user.otp = otp;
    await user.save();

    const html = `<h2>Password Reset OTP</h2><p>Your OTP is: <strong>${otp}</strong></p>`;
    await sendEmail(user.email, "Password Reset OTP", html);

    sendResponse(res, 200, true, "OTP Sent to Email");
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email, OTP, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return sendResponse(res, 404, false, "User Not Found");
    if (Number(OTP) !== user.otp)
      return sendResponse(res, 400, false, "Invalid OTP");

    user.password = await bcrypt.hash(password, 10);
    user.otp = null;
    await user.save();

    sendResponse(res, 200, true, "Password Updated Successfully");
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId).select("+password");
    if (!user) return sendResponse(res, 404, false, "User Not Found");

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return sendResponse(res, 400, false, "Incorrect current password");

    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame)
      return sendResponse(
        res,
        400,
        false,
        "New password cannot be the same as current"
      );

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    sendResponse(res, 200, true, "Password Changed Successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  forgetPassword,
  resetPassword,
  changePassword,
};
