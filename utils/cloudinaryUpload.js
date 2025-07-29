
const cloudinary = require("../config/cloudinary");

const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const streamUpload = (buffer, options = {}) =>
  new Promise((resolve, reject) => {
    console.log("🔄 Starting Cloudinary upload with options:", options);
    console.log("🔀 Buffer size:", buffer.length, "bytes");

    const uploadOptions = {
      folder: "profiles",           
      transformation: [{ width: 500, crop: "limit" }],
      ...options,                  
    };

    const stream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (result) {
          console.log("✅ Cloudinary upload successful:", {
            public_id: result.public_id,
            secure_url: result.secure_url,
          });
          resolve(result);
        } else {
          console.error("Cloudinary upload error:", error);
          reject(error);
const streamUpload = (buffer, options = {}) =>
  new Promise((resolve, reject) => {
    console.log("🔄 Starting Cloudinary upload with options:", options);
    console.log("🔀 Buffer size:", buffer.length, "bytes");

    const uploadOptions = {
      folder: "profiles",           
      transformation: [{ width: 500, crop: "limit" }],
      ...options,                  
    };

    const stream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (result) {
          console.log("✅ Cloudinary upload successful:", {
            public_id: result.public_id,
            secure_url: result.secure_url,
          });
          resolve(result);
        } else {
          console.error("Cloudinary upload error:", error);
          reject(error);
        }
      }
    );

    const readStream = streamifier.createReadStream(buffer);
    readStream.on("error", (err) => {
      console.error("Streamifier read error:", err);
      reject(err);
    });

    readStream.pipe(stream);
  });
      }
    );

    const readStream = streamifier.createReadStream(buffer);
    readStream.on("error", (err) => {
      console.error("Streamifier read error:", err);
      reject(err);
    });

    readStream.pipe(stream);
  });

module.exports = streamUpload;