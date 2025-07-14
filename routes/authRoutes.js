const express = require('express');
const {
  signUp,
  login,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');
const { registerSchema, loginSchema } = require('../validations/auth.validation');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

router.post('/signup', validateRequest(registerSchema), signUp);
router.post('/login', validateRequest(loginSchema), login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
