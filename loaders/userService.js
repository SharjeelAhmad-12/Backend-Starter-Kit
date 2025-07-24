const userServices = require("../services/user.service");
const User = require("../models/user.model");
const cloudinary = require("../config/cloudinary");
const streamUpload = require("../utils/streamUpload");

const userService = userServices(User, cloudinary, streamUpload);

module.exports = userService;
