const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const otpRoutes = require("./routes/otpRoutes");
const authRoutes = require("./routes/authRoutes"); 
const profileRoutes = require("./routes/profileRoutes");
const setupSwagger = require("./config/swagger");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
setupSwagger(app);

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`)
  console.log(` Swagger docs at http://localhost:${port}/api-docs`)
});