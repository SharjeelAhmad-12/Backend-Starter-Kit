
const otpService = ({ OtpModel, UserModel, sendOTP }) => {
  const handleOTPVerification = async (userId, otp) => {
    if (!userId || !otp) {
      throw new Error("User ID and OTP are required");
    }

    const otpRecord = await OtpModel.findOne({ userId, otp });
    if (!otpRecord) {
      throw new Error("Invalid OTP");
    }

    await UserModel.findByIdAndUpdate(userId, { isVerified: true });
    await OtpModel.deleteMany({ userId });

    return { message: "OTP verified successfully" };
  };

  const handleResendOTP = async (userId, email) => {
    if (!userId || !email) {
      throw new Error("User ID and Email are required");
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    await OtpModel.deleteMany({ userId });
    await OtpModel.create({ userId, otp });

    await sendOTP(email, otp);
    return { message: "OTP resent successfully" };
  };

  return {
    handleOTPVerification,
    handleResendOTP,
  };
};

module.exports = otpService;