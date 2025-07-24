const express = require("express");
const router = express.Router();
const { GetSearchedUsers } = require("../controllers/userController");
const { authMiddleware, authorizeRoles } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/users/search-users:
 *   get:
 *     summary: Search users by name, email, role, and verification status (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name or email
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Filter by user role
 *       - in: query
 *         name: isVerified
 *         schema:
 *           type: boolean
 *         description: Filter by verification status (true or false)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of users per page
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 */
router.get(
  "/search-users",
  authMiddleware,
  authorizeRoles("admin"),
  GetSearchedUsers
);

module.exports = router;
