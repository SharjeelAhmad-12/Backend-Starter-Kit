const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectDB = require("./config/db");
const morganMiddleware = require("./middlewares/morganMiddleware");
const setupSwagger = require("./config/swagger");

const authService = require("./loaders/authService");
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

const { authMiddleware, authorizeRoles } = require("./middlewares/authMiddleware");
const validateRequest = require("./middlewares/validateRequest");
const upload = require("./middlewares/uploadMiddleware");
const updateProfileSchema = require("./validations/profileValidation");


const app = express();

app.use(express.json());
setupSwagger(app);
app.use(morganMiddleware);

const authController = authControllerFactory(authService);
const otpController = otpControllerFactory(otpService);

app.use("/api/otp", otpRoutes(otpController));
app.use("/api/auth", authRoutes(authController));


app.use(
  "/api/users",
  userRoutes({
    profileController,
    userController,
    authMiddleware,
    authorizeRoles,
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
