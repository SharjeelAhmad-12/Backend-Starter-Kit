const express = require("express");

const userRoutes = ({
  profileController,
  userController,
  authMiddleware,
  authorizeRoles,
  validateRequest,
  upload,
  updateProfileSchema,
}) => {
  const router = express.Router();

  
  router.get("/profile", authMiddleware, profileController.getProfile);

  router.put(
    "/profile",
    authMiddleware,
    upload.single("profileImage"),
    validateRequest(updateProfileSchema),
    profileController.updateProfile
  );

  router.delete("/profile", authMiddleware, profileController.deleteProfile);

  router.get(
    "/search-users",
    authMiddleware,
    authorizeRoles("admin"),
    userController.GetSearchedUsers
  );

  return router;
};

module.exports = userRoutes;
