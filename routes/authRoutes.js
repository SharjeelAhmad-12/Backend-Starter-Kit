const express = require("express");
const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
} = require("../validations/auth.validation");

const validateRequest = require("../middlewares/validateRequest");
const verifyToken = require("../middlewares/verifyToken");

module.exports = ( authController ) => {
  const router = express.Router();

  router.post(
    "/signup",
    validateRequest(registerSchema),
    authController.signup
  );

  router.post(
    "/login",
    validateRequest(loginSchema),
    authController.login
  );

  router.post(
    "/forgot-password",
    validateRequest(forgotPasswordSchema),
    authController.forgetPassword
  );

  router.post(
    "/reset-password",
    validateRequest(resetPasswordSchema),
    authController.resetPassword
  );

  router.put(
    "/change-password",
    verifyToken,
    validateRequest(changePasswordSchema),
    authController.changePassword
  );

  router.post("/logout", verifyToken, authController.logout);
  router.post("/refreshAccessToken", authController.refreshAccessToken);

  return router;
};