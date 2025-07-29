
const express = require("express");
<<<<<<< HEAD
=======
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
>>>>>>> feature/auth-DI

const authRoutes = (authController) => {
  const router = express.Router();

<<<<<<< HEAD
  router.post("/signup", authController.signup);
  router.post("/login", authController.login);
  router.post("/forget-password", authController.forgetPassword);
  router.post("/reset-password", authController.resetPassword);
  router.post("/change-password", authController.changePassword);
  router.get("/refresh-token", authController.refreshAccessToken);
  router.post("/logout", authController.logout);

  return router;
};

module.exports = authRoutes;
=======
router.post("/signup", validateRequest(registerSchema), signup);
router.post("/login", validateRequest(loginSchema), login);
router.post("/forgot-password",validateRequest(forgotPasswordSchema), forgetPassword);
router.post("/reset-password", validateRequest(resetPasswordSchema),resetPassword);
router.put("/change-password", verifyToken, validateRequest(changePasswordSchema),changePassword);
router.post("/logout", verifyToken, logout);
router.post("/refreshAccessToken", refreshAccessToken);

module.exports = router;
>>>>>>> feature/auth-DI
