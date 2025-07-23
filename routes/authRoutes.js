const express = require('express');
const {
  signup,
  login,
  forgetPassword,
  resetPassword,
  changePassword,
  logout,
  refreshAccessToken,
} = require('../controllers/authController');
const { registerSchema, loginSchema } = require('../validations/auth.validation');
const validateRequest = require('../middlewares/validateRequest');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user 
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already in use
 */
router.post('/signup', validateRequest(registerSchema), signup);


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user 
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

router.post('/login', validateRequest(loginSchema), login);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Send OTP to user's email for password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: OTP sent to email
 *       404:
 *         description: User not found
 */
router.post('/forgot-password', forgetPassword);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset user password using OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - OTP
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               OTP:
 *                 type: integer
 *                 example: 1234
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid OTP
 *       404:
 *         description: User not found
 */
router.post('/reset-password', resetPassword);

/**
 * @swagger
 * /api/auth/change-password:
 *   put:
 *     summary: Change the user's password 
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: string
 *               newPassword:
 *                 type: string
 *                 example: string12
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Incorrect current password or new password same as current
 *       401:
 *         description: Unauthorized
 */
router.put('/change-password', authMiddleware, changePassword);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logs out user
 *     tags: [Auth]
 *     description: Logs out user.
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post('/logout', authMiddleware, logout);

/**
 * @swagger
 * /api/auth/refreshAccessToken:
 *   post:
 *     summary: Generate a new access token 
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *       401:
 *         description: No refresh token found or invalid
 */
router.post('/refreshAccessToken', refreshAccessToken);


module.exports = router;
