const express= require("express");
const { verifyOTP } = require("../controllers/otpController");
const { resendOTP } = require("../controllers/otpController");  
const router = express.Router();

router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
module.exports = router;