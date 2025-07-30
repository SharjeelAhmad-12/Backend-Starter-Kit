const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectDB = require("./config/db");
const morganMiddleware = require("./middlewares/morganMiddleware");
const setupSwagger = require("./config/swagger");

const otpService = require("./loaders/otpService");
const otpControllerFactory = require("./controllers/otpController");

const authRoutes = require("./routes/authRoutes");
const otpRoutes = require("./routes/otpRoutes");

const userServiceFactory = require("./services/user.service");
const User = require("./models/user");
const cloudinary = require("./config/cloudinary");
const streamUpload = require("./utils/cloudinaryUpload");

const userService = userServiceFactory(User, cloudinary, streamUpload); 
const userController = require("./controllers/userController")(userService);

const profileController = userController;
const userRoutes = require("./routes/userRoutes");

const authorizeRole = require("./middlewares/authorizeRole");
const verifyToken = require("./middlewares/verifyToken");


const validateRequest = require("./middlewares/validateRequest");
const upload = require("./middlewares/uploadMiddleware");
const {updateProfileSchema} = require("./validations/profileValidation");


const app = express();

app.use(express.json());
app.use(express.static('public')); // Serve static files from public directory
setupSwagger(app);
app.use(morganMiddleware);

// Serve the API banner page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/api-banner.html');
});

const authController = require("./loaders/authService"); 

const otpController = otpControllerFactory(otpService);

app.use("/api/auth", authRoutes(authController));
app.use("/api/otp", otpRoutes(otpController));

app.use(
  "/api/users",
  userRoutes({
    profileController,
    userController,
    verifyToken,
    authorizeRole,
    validateRequest,
    upload,
    updateProfileSchema,
  })
);

connectDB().then(() => {
  app.listen(process.env.PORT || 8000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 8000}`);
    console.log(`📄 Swagger Docs: http://localhost:${8000}/api-docs`);

  });
});