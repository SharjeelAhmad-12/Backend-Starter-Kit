const otpControllerFactory = (otpService) => ({
  verifyOTP: async (req, res, next) => {
    try {
      const { userId, otp } = req.body;
      const result = await otpService.handleOTPVerification(userId, otp);
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  },

  resendOTP: async (req, res, next) => {
    try {
      const { userId, email } = req.body;
      const result = await otpService.handleResendOTP(userId, email);
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  },
});

module.exports = otpControllerFactory;