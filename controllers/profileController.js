const User = require("../models/user");
const cloudinary = require("../config/cloudinary");
const streamUpload = require("../utils/cloudinaryUpload");


const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -otp");
  res.json(user);
};

const updateProfile = async (req, res) => {
  const updates = req.body;

  if (req.file) {
    const result = await streamUpload(req.file.buffer);
    updates.profileImage = {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }

  const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
  }).select("-password -otp");

  res.json(updatedUser);
};

const deleteProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.profileImage?.public_id) {
    try {
      await cloudinary.uploader.destroy(user.profileImage.public_id);
    } catch (error) {
      console.error("Cloudinary deletion failed:", error);
    }
  }

  await User.findByIdAndDelete(req.user._id);
  res.json({ message: "User and profile image deleted successfully" });
};

module.exports = {
  getProfile,
  updateProfile,
  deleteProfile,
};
