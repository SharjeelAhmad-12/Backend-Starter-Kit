const express = require("express");

const authRoutes = ({
  authController,
  authMiddleware,
  validateRequest,
  registerSchema,
  loginSchema,
}) => {
  const router = express.Router();

  router.post("/signup", validateRequest(registerSchema), authController.signup);
  router.post("/login", validateRequest(loginSchema), authController.login);
  router.post("/forgot-password", authController.forgetPassword);
  router.post("/reset-password", authController.resetPassword);
  router.put("/change-password", authMiddleware, authController.changePassword);
  router.post("/logout", authMiddleware, authController.logout);
  router.post("/refreshAccessToken", authController.refreshAccessToken);

  return router;
};

module.exports = authRoutes;
