const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Debug logs to verify config
console.log("🔐 Cloudinary Config:");
console.log("  CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME || "❌ Not Set");
console.log("  API_KEY:", process.env.CLOUDINARY_API_KEY ? "✔️ Present" : "❌ Missing");
console.log("  API_SECRET:", process.env.CLOUDINARY_API_SECRET ? "✔️ Present" : "❌ Missing");
module.exports = cloudinary;
