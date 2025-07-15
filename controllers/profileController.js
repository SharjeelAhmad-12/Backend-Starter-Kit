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
    updates.profileImage = result.secure_url;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
  }).select("-password -otp");

  res.json(updatedUser);
};

const deleteProfile = async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  res.json({ message: "Profile deleted" });
};

module.exports = {
    getProfile,
    updateProfile,
    deleteProfile
}