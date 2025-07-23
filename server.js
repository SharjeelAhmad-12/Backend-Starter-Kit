const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser=require("cookie-parser");
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require("./routes/profileRoutes");
const setupSwagger = require('./config/swagger');

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:8000", 
    credentials: true,
}
));
app.use(express.json());
app.use(cookieParser());

setupSwagger(app);

app.use('/api/auth', authRoutes);
app.use("/api/profile", profileRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message || 'An unexpected error occurred',
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
