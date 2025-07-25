const express = require('express');
const {
  signup,
  login,
  forgetPassword,
  resetPassword,
  changePassword,
} = require('../controllers/authController');
const { registerSchema, loginSchema } = require('../validations/auth.validation');
const validateRequest = require('../middlewares/validateRequest');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', validateRequest(registerSchema), signup);
router.post('/login', validateRequest(loginSchema), login);
router.post('/forgot-password', forgetPassword);
router.post('/reset-password', resetPassword);
router.put('/change-password', authMiddleware, changePassword);

module.exports = router;
