const express = require("express");

const otpRoutes = ({ otpController }) => {
  const router = express.Router();

  router.post("/verify-otp", otpController.verifyOTP);
  router.post("/resend-otp", otpController.resendOTP);

  return router;
};

module.exports = otpRoutes;
