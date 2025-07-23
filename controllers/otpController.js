const Otp= require("../models/otp");
const User= require("../models/User");
const sendResponse = require("../utils/sendResponse");
const sendOTP = require("../utils/sendOTP");
const crypto = require("crypto");

const verifyOTP = async (req, res, next) => {
    
        try{
            const {userId, otp}=req.body;
            if(!userId || !otp) {
                return sendResponse(res, 400, false, "User ID and OTP are required");
            }
       const otpRecord = await Otp.findOne({ userId, otp });
            if (!otpRecord) {
                return sendResponse(res, 404, false, "Invalid OTP or User ID");
            }
            if (otpRecord.verified) {
                return sendResponse(res, 400, false, "OTP already verified");
            }
            if (otpRecord.expiresAt < Date.now()) {
                return sendResponse(res, 400, false, "OTP has expired");
            }

            otpRecord.verified = true;
            
            await otpRecord.save();
            const user = await User.findById(userId);
            if (!user) {
                return sendResponse(res, 404, false, "User Not Found");
            }
            user.isVerified = true;
            await Promise.all([otpRecord.save(), user.save()]);

            sendResponse(res, 200, true, "OTP verified successfully");
        }
        catch (error) {
            return sendResponse(res, 500, false, "Internal Server Error");
        }
    }

const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 404, false, 'User not found');
    }

    const existingOtp = await Otp.findOne({ userId: user._id }).sort({ createdAt: -1 });

    if (existingOtp) {
      const now = new Date();
      const lastSentTime = new Date(existingOtp.createdAt);
      const diffInMinutes = (now - lastSentTime) / (1000 * 60);

      if (diffInMinutes < 2) {
        const wait = Math.ceil(2 - diffInMinutes);
        return sendResponse(
          res,
          429,
          false,
          `Please wait ${wait} more minute(s) before requesting another OTP.`
        );
      }
    }

   
    await sendOTP(user._id, user.email);

    return sendResponse(res, 200, true, 'OTP resent successfully');
  } catch (err) {
    console.error('Resend OTP error:', err);
    return sendResponse(res, 500, false, 'Failed to resend OTP');
  }
};

module.exports = {
    verifyOTP,
    resendOTP
};