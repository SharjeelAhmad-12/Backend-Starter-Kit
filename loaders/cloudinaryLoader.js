const cloudinary = require('../config/cloudinary');
const createStreamUpload = require('../utils/cloudinaryUpload');

const streamUpload = createStreamUpload(cloudinary);

module.exports = {
  streamUpload,
};