const User = require("../models/user");
const cloudinary = require("../config/cloudinary");
const {streamUpload} = require("../loaders/cloudinaryLoader")


const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password -otp");
  res.json(user);
};

const updateProfile = async (req, res) => {
  try {
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

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.profileImage?.publicid) {
    try {
      await cloudinary.uploader.destroy(user.profileImage.publicid);
    } catch (error) {
      console.error("Cloudinary deletion failed:", error);
    }
  }

  await User.findByIdAndDelete(req.user.id);
  res.json({ message: "User and profile image deleted successfully" });
};

module.exports = {
  getProfile,
  updateProfile,
  deleteProfile,
};
