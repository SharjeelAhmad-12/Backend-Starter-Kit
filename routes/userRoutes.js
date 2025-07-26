const express = require("express");
const router = express.Router();
const { GetSearchedUsers } = require("../controllers/userController");
const verifyToken=require("../middlewares/verifyToken");
const authorizeRole=require("../middlewares/authorizeRole")

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
  verifyToken,
  authorizeRole("admin"),
  GetSearchedUsers
);
  router.get(
    "/search-users",
    authMiddleware,
    authorizeRoles("admin"),
    userController.getSearchedUsers
  );

  return router;
};

module.exports = userRoutes;
