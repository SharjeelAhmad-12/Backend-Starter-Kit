/**
 * @swagger
 * tags:
 *   name: OTP
 *   description: One-time password verification and management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     VerifyOTPRequest:
 *       type: object
 *       required:
 *         - userId
 *         - otp
 *       properties:
 *         userId:
 *           type: string
 *           pattern: "^[0-9a-fA-F]{24}$"
 *           description: MongoDB ObjectId of the user
 *           example: "64bfe34dc6543b99fbcdd8e5"
 *         otp:
 *           type: integer
 *           minimum: 100000
 *           maximum: 999999
 *           description: 6-digit OTP sent to user's email
 *           example: 123456
 *     
 *     ResendOTPRequest:
 *       type: object
 *       required:
 *         - userId
 *         - email
 *       properties:
 *         userId:
 *           type: string
 *           pattern: "^[0-9a-fA-F]{24}$"
 *           description: MongoDB ObjectId of the user
 *           example: "64d3ff77b7e034001fbe290c"
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *           example: "test@example.com"
 *     
 *     OTPVerificationResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "OTP verified successfully"
 *         data:
 *           type: object
 *           properties:
 *             isVerified:
 *               type: boolean
 *               description: Whether the user is now verified
 *             user:
 *               $ref: '#/components/schemas/User'
 *     
 *     OTPResendResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "OTP resent successfully"
 *         data:
 *           type: object
 *           properties:
 *             expiresAt:
 *               type: string
 *               format: date-time
 *               description: When the OTP expires
 *             userId:
 *               type: string
 *               description: User ID for reference
 */

/**
 * @swagger
 * /api/otp/verify:
 *   post:
 *     summary: Verify user's OTP
 *     description: Verifies the 6-digit OTP sent to the user's email and marks the user as verified
 *     tags: [OTP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyOTPRequest'
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OTPVerificationResponse'
 *       400:
 *         description: Invalid request data or OTP already verified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalidData:
 *                 summary: Invalid Data
 *                 value:
 *                   success: false
 *                   message: "Missing or invalid data"
 *               alreadyVerified:
 *                 summary: Already Verified
 *                 value:
 *                   success: false
 *                   message: "User is already verified"
 *       404:
 *         description: Invalid OTP or user not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalidOTP:
 *                 summary: Invalid OTP
 *                 value:
 *                   success: false
 *                   message: "Invalid or expired OTP"
 *               userNotFound:
 *                 summary: User Not Found
 *                 value:
 *                   success: false
 *                   message: "User not found"
 *       410:
 *         description: OTP expired
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               expiredOTP:
 *                 summary: OTP Expired
 *                 value:
 *                   success: false
 *                   message: "OTP has expired"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/otp/resend:
 *   post:
 *     summary: Resend OTP to user's email
 *     description: Generates and sends a new 6-digit OTP to the user's email address
 *     tags: [OTP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResendOTPRequest'
 *     responses:
 *       200:
 *         description: OTP resent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OTPResendResponse'
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalidData:
 *                 summary: Invalid Data
 *                 value:
 *                   success: false
 *                   message: "Missing or invalid data"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               userNotFound:
 *                 summary: User Not Found
 *                 value:
 *                   success: false
 *                   message: "User not found"
 *       429:
 *         description: Rate limit exceeded - must wait before requesting another OTP
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               rateLimitExceeded:
 *                 summary: Rate Limit Exceeded
 *                 value:
 *                   success: false
 *                   message: "Too many OTP requests. Please wait before requesting another OTP"
 *       500:
 *         description: Failed to send OTP or internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               emailError:
 *                 summary: Email Error
 *                 value:
 *                   success: false
 *                   message: "Failed to send OTP email"
 */
