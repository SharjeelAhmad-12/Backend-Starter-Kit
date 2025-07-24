const express = require("express");
const {
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/profileController");
const verifyToken=require("../middlewares/verifyToken")
const validateRequest = require("../middlewares/validateRequest");
const upload = require("../middlewares/uploadMiddleware");
const { updateProfileSchema } = require("../validations/profileValidation");

const router = express.Router();

router.get("/", verifyToken, getProfile);
router.put(
  "/",
  verifyToken,
  upload.single("profileImage"),
  validateRequest(updateProfileSchema),
  updateProfile
);
router.delete("/", verifyToken, deleteProfile);

module.exports = router;
