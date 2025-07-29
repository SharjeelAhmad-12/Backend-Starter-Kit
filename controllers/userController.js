const userController = (userService) => {
  const getProfile = async (req, res) => {
    try {
      const user = await userService.getProfile(req.user.id);
      res.status(200).json({
        success: true,
        message: "Profile fetched successfully",
        data: user,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  };

  const updateProfile = async (req, res) => {
    try {
      const imageBuffer = req.file?.buffer;
      const updatedUser = await userService.updateProfile(
        req.user.id,
        req.body,
        imageBuffer
      );
      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  const deleteProfile = async (req, res) => {
    try {
      const result = await userService.deleteProfile(req.user.id);
      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  };

  const getSearchedUsers = async (req, res) => {
    try {
      const data = await userService.getSearchedUsers(req.query);
      res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        ...data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  return {
    getProfile,
    updateProfile,
    deleteProfile,
    getSearchedUsers,
  };
};

module.exports = userController;

