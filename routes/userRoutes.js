const express = require("express");

const userRoutes = ({
  profileController,
  userController,
  verifyToken,
  authorizeRole,
  validateRequest,
  upload,
  updateProfileSchema,
}) => {
  const router = express.Router();

  router.get("/profile", verifyToken, userController.getProfile); 

  router.put(
    "/profile",
    verifyToken,
    upload.single("profileImage"), 
    validateRequest(updateProfileSchema),
    userController.updateProfile 
  );

  router.delete("/profile", verifyToken, userController.deleteProfile); 

  router.get(
    "/search-users",
    verifyToken,
    authorizeRole("admin"),
    userController.getSearchedUsers
  );

  return router;
};

module.exports = userRoutes;
