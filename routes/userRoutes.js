const express = require("express");
const router= express.Router();
const { GetSearchedUsers } = require("../controllers/userController");
const {authMiddleware,authorizeRoles} = require("../middlewares/authMiddleware");

router.get("/search-users", authMiddleware, authorizeRoles("admin"), GetSearchedUsers);

module.exports = router;