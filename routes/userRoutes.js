const express = require("express");
const router = express.Router();
const { GetSearchedUsers } = require("../controllers/userController");
const verifyToken=require("../middlewares/verifyToken");
const authorizeRole=require("../middlewares/authorizeRole")

router.get(
  "/search-users",
  verifyToken,
  authorizeRole("admin"),
  GetSearchedUsers
);

module.exports = router;
