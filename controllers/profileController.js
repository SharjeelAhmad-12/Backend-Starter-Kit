const User = require("../models/User");
const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");

const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -otp");
  res.json(user);
};

const updateProfile = async (req, res) => {
  const updates = req.body;

  if (req.file) {
    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "profiles",
            resource_type: "image",
            transformation: [{ width: 500, crop: "limit" }],
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await streamUpload();
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
    deleteProfile
}