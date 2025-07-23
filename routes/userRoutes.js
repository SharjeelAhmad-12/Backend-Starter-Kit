const express = require("express");
const router= express.Router();
const { GetSearchedUsers } = require("../controllers/userController");
const {isAuthenticated,authorizeRoles} = require("../middlewares/authMiddleware");

router.get("/search-users", isAuthenticated, authorizeRoles("admin"), GetSearchedUsers);

module.exports = router;