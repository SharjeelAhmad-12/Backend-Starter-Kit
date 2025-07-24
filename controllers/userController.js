const User = require("../models/user");

const GetSearchedUsers = async (req, res) => {
  try {
    let query = {};
    const { search, role, isVerified, page = 1, limit = 10 } = req.query;
    const numericLimit = parseInt(limit);
    const currentPage = parseInt(page);

    if (search && search.trim() !== "") {
      const regex = new RegExp(search, 'i');
      query.$or = [
        { name: { $regex: regex } },
        { email: { $regex: regex } }
      ];
    }

    if (role) {
      query.role = role;
    }

    if (isVerified === 'true' || isVerified === 'false') {
      query.isVerified = isVerified === 'true';
    }

    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / numericLimit);

    const users = await User.find(query)
      .skip((currentPage - 1) * numericLimit)
      .limit(numericLimit)
      .select("-password -otp")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
      totalUsers,
      totalPages,
      currentPage
    });

  } catch (error) {
    console.error("Admin User Fetch Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

module.exports = {
  GetSearchedUsers
};
