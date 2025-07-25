
const express = require("express");

const authRoutes = (authController) => {
  const router = express.Router();

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
