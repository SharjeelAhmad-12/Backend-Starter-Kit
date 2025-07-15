const express = require("express");
const {
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/profileController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const validateRequest = require("../middlewares/validateRequest");
const upload = require("../middlewares/uploadMiddleware");
const { updateProfileSchema } = require("../validations/profileValidation");

const router = express.Router();

router.get("/", authMiddleware, getProfile);
router.put(
  "/",
  authMiddleware,
  upload.single("profileImage"),
  validateRequest(updateProfileSchema),
  updateProfile
);
router.delete("/", authMiddleware, deleteProfile);

module.exports = router;
