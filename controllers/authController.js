const authLoader = require("../loaders/authLoader");
const sendResponse = require("../utils/sendResponse");

const signup = async (req, res, next) => {
  try {
    const result = await authLoader.signup(req.body);
    sendResponse(res, 201, true, "User Registered Successfully", result);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authLoader.login(req.body.email, req.body.password);
    sendResponse(res, 200, true, "Login Successful", result);
  } catch (error) {
    next(error);
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    await authLoader.forgetPassword(req.body.email);
    sendResponse(res, 200, true, "OTP Sent to Email");
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email, OTP, password } = req.body;
    await authLoader.resetPassword(email, OTP, password);
    sendResponse(res, 200, true, "Password Updated Successfully");
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return sendResponse(res, 401, false, "Unauthorized access");
    }

    const result = await authLoader.changePassword(userId, currentPassword, newPassword);
    sendResponse(res, 200, true, "Password Changed Successfully", result);
  } catch (error) {
    next(error);
  }
};

const refreshAccessToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return sendResponse(res, 401, false, "No refresh token found");
    }

    const accessToken = await authLoader.refreshAccessToken(token);
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
