const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    otp: { type: Number, default: null },
    phone: { type: String, default: null },
    profileImage: {
      url: { type: String, default: null },
      public_id: { type: String, default: null },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
