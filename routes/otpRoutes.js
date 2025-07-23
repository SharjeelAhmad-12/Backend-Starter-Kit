const express= require("express");
const { verifyOTP } = require("../controllers/otpController");
const router = express.Router();

router.post("/verify-otp", verifyOTP);
module.exports = router;