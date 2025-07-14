const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);

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
