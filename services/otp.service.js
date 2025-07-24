const otpServices = ({ OtpModel, UserModel, sendOTP, sendResponse }) => {
  const handleOTPVerification = async (req, res) => {
    try {
      const { userId, otp } = req.body;
      if (!userId || !otp) {
        return sendResponse(res, 400, false, "User ID and OTP are required");
      }

      const otpRecord = await OtpModel.findOne({ userId, otp });
      if (!otpRecord) {
        return sendResponse(res, 401, false, "Invalid OTP");
      }

      await UserModel.findByIdAndUpdate(userId, { isVerified: true });
      await OtpModel.deleteMany({ userId });

      return sendResponse(res, 200, true, "OTP verified successfully");
    } catch (error) {
      console.error("OTP Verification Error:", error);
      return sendResponse(res, 500, false, "Internal Server Error", { error: error.message });
    }
  };

  const handleResendOTP = async (req, res) => {
    try {
      const { userId, email } = req.body;
      if (!userId || !email) {
        return sendResponse(res, 400, false, "User ID and Email are required");
      }

      const otp = Math.floor(100000 + Math.random() * 900000);
      await OtpModel.deleteMany({ userId });
      await OtpModel.create({ userId, otp });

      await sendOTP(email, otp);
      return sendResponse(res, 200, true, "OTP resent successfully");
    } catch (error) {
      console.error("Resend OTP Error:", error);
      return sendResponse(res, 500, false, "Internal Server Error", { error: error.message });
    }
  };

  return {
    handleOTPVerification,
    handleResendOTP,
  };
};

module.exports = otpServices;
