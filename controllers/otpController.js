const otpController = (otpService) => {
  const verifyOTP = async (req, res) => {
    return otpService.handleOTPVerification(req, res);
  };

  const resendOTP = async (req, res) => {
    return otpService.handleResendOTP(req, res);
  };

  return {
    verifyOTP,
    resendOTP,
  };
};

module.exports = otpController;
