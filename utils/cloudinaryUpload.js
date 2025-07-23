const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const streamUpload = (buffer, options = {}) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "profiles",
        resource_type: "image",
        transformation: [{ width: 500, crop: "limit" }],
        ...options,
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });

module.exports = streamUpload;
