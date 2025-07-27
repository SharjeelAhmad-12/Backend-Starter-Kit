const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morganMiddleware = require("./middlewares/morganMiddleware");
const setupSwagger = require("./config/swagger");

const authService = require("./loaders/authLoader");
const otpService = require("./loaders/otpService");

const authControllerFactory = require("./controllers/authController");
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

const verifyToken = require("./middlewares/verifyToken");
const authorizeRole = require("./middlewares/authorizeRole");

const validateRequest = require("./middlewares/validateRequest");
const upload = require("./middlewares/uploadMiddleware");
const updateProfileSchema = require("./validations/profileValidation");

dotenv.config();

const app = express();

app.use(express.json());
setupSwagger(app);
app.use(morganMiddleware);

const authController = authControllerFactory(authService);
const otpController = otpControllerFactory(otpService);

app.use("/api/otp", otpRoutes(otpController));
app.use("/api/auth", authRoutes({ authController }));


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
    console.log(`📚 Swagger docs available at: http://localhost:${process.env.PORT}/api-docs`);
  });
});
