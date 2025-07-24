const express = require("express");
const {
  signup,
  login,
  forgetPassword,
  resetPassword,
  changePassword,
  logout,
  refreshAccessToken,
} = require("../controllers/authController");
const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
} = require("../validations/auth.validation");
const validateRequest = require("../middlewares/validateRequest");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/signup", validateRequest(registerSchema), signup);
router.post("/login", validateRequest(loginSchema), login);
router.post("/forgot-password",validateRequest(forgotPasswordSchema), forgetPassword);
router.post("/reset-password", validateRequest(resetPasswordSchema),resetPassword);
router.put("/change-password", verifyToken, validateRequest(changePasswordSchema),changePassword);
router.post("/logout", verifyToken, logout);
router.post("/refreshAccessToken", refreshAccessToken);

module.exports = router;
