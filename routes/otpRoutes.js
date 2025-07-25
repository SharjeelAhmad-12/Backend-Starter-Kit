const express = require("express");

module.exports = (otpController) => {
  const router = express.Router();

  router.post("/verify-otp", otpController.verifyOTP);
  router.post("/resend-otp", otpController.resendOTP);

  return router;
};
