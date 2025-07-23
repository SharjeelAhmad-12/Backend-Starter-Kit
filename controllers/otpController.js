const Otp= require("../models/otp");
const User= require("../models/User");
const sendResponse = require("../utils/sendResponse");

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

    module.exports = {
        verifyOTP
    };