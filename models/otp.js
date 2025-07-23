const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    otp: { type: Number, required: true },
    expiresAt: { 
    type: Date,
    default: () => Date.now() + 10 * 60 * 1000, 
    index: { expires: '0s' }
 },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Otp", otpSchema);
