const authService = require("../loaders/authService");
const sendResponse = require("../utils/sendResponse");

const signup = async (req, res, next) => {
  try {
    const response = await authService.signup(req.body);
    sendResponse(res, 201, true, "User registered successfully", response);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    sendResponse(res, 200, true, "Login Successful", result);
  } catch (error) {
    next(error);
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    await authService.forgetPassword(req.body.email);
    sendResponse(res, 200, true, "OTP Sent to Email");
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    await authService.resetPassword(req.body.email, req.body.OTP, req.body.password);
    sendResponse(res, 200, true, "Password Updated Successfully");
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const result = await authService.changePassword(req.user.id, req.body.currentPassword, req.body.newPassword);
    sendResponse(res, 200, true, "Password Changed Successfully", result);
  } catch (error) {
    next(error);
  }
};

const refreshAccessToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    const accessToken = authService.refreshAccessToken(token);
    sendResponse(res, 200, true, { accessToken });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  sendResponse(res, 200, true, "Logged out successfully");
};

module.exports = {
  signup,
  login,
  forgetPassword,
  resetPassword,
  changePassword,
  refreshAccessToken,
  logout,
};
