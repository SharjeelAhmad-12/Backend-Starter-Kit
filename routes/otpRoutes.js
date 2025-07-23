const express = require("express");
const { verifyOTP, resendOTP } = require("../controllers/otpController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: OTP
 *   description: OTP verification and resend functionality
 */

/**
 * @swagger
 * /api/otp/verify-otp:
 *   post:
 *     summary: Verify a user's OTP
 *     tags: [OTP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - otp
 *             properties:
 *               userId:
 *                 type: string
 *                 description: MongoDB ObjectId of the user
 *                 example: "64bfe34dc6543b99fbcdd8e5"
 *               otp:
 *                 type: number
 *                 description: 6-digit OTP sent to user's email
 *                 example: 123456
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Missing or invalid data / Already verified
 *       404:
 *         description: Invalid OTP or User not found
 *       500:
 *         description: Internal Server Error
 */
router.post("/verify-otp", verifyOTP);

/**
 * @swagger
 * /api/otp/resend-otp:
 *   post:
 *     summary: Resend an OTP to the user's email
 *     tags: [OTP]
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
 *                 description: Email address of the user
 *                 example: "test@example.com"
 *     responses:
 *       200:
 *         description: OTP resent successfully
 *       404:
 *         description: User not found
 *       429:
 *         description: Must wait before requesting another OTP
 *       500:
 *         description: Failed to resend OTP
 */
router.post("/resend-otp", resendOTP);

module.exports = router;
