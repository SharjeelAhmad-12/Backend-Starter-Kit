const userServices = (User, cloudinary, streamUpload) => {
  const getProfile = async (userId) => {
    const user = await User.findById(userId).select("-password -otp");
    if (!user) throw new Error("User not found");
    return user;
  };

  const updateProfile = async (userId, updateData, imageBuffer) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    if (imageBuffer) {
      const result = await streamUpload(imageBuffer, "user-profiles");
      updateData.profilePicture = result.secure_url;
    }

    Object.assign(user, updateData);
    await user.save();

    return user;
  };

  const deleteProfile = async (userId) => {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new Error("User not found");
    return { message: "User deleted successfully" };
  };

  const getSearchedUsers = async (filters) => {
    let query = {};
    const { search, role, isVerified, page = 1, limit = 10 } = filters;

    const numericLimit = parseInt(limit);
    const currentPage = parseInt(page);

    if (search?.trim()) {
      const regex = new RegExp(search, "i");
      query.$or = [{ name: { $regex: regex } }, { email: { $regex: regex } }];
    }

    if (role) query.role = role;
    if (isVerified === "true" || isVerified === "false") {
      query.isVerified = isVerified === "true";
    }

    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / numericLimit);

    const users = await User.find(query)
      .skip((currentPage - 1) * numericLimit)
      .limit(numericLimit)
      .select("-password -otp")
      .sort({ createdAt: -1 });

    return { users, totalUsers, totalPages, currentPage };
  };

  return {
    getProfile,
    updateProfile,
    deleteProfile,
    getSearchedUsers
  };
};

module.exports = userServices;
