const Otp = require("../models/otp");
const sendEmail=require("./sendEmail");


const sendOTP=async(userId,email)=>
{
const otp = Math.floor(100000 +Math.random() * 900000).toString();

await Otp.deleteMany({ userId });
await Otp.create({ userId, otp });

const subject = "Your OTP Code";
const html=`<h1>Email Verification OTP</h1>
<p>Your OTP is:</p>
<h1>${otp}</h1>
<p>This OTP will expire in 10 minutes.</p>`;

await sendEmail(email, subject, html);
}

module.exports= sendOTP;