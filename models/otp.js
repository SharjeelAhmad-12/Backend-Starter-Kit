const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    otp: { type: Number, required: true },

    createdAt: {
      type: Date,
      default: Date.now,
      expires: 600 
    },

    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Otp", otpSchema);
