const streamifier = require("streamifier");

const streamUpload = (cloudinary) => {
  return async (buffer, options = {}) => {
    return new Promise((resolve, reject) => {
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
  };
};

module.exports = streamUpload;
