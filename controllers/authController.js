const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const sendResponse = require('../utils/sendResponse');
const sendEmail = require('../utils/sendEmail');

const signUp = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return sendResponse(res, 400, false, 'Email already exists');

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });

    const token = generateToken({ id: user._id, role: user.role });
    sendResponse(res, 201, true, 'Registered successfully', { token, user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return sendResponse(res, 404, false, 'User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return sendResponse(res, 401, false, 'Invalid credentials');

    const token = generateToken({ id: user._id, role: user.role });
    sendResponse(res, 200, true, 'Login successful', { token, user });
  } catch (err) {
    next(err);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return sendResponse(res, 404, false, 'User not found');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const resetURL = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const html = `<h3>Reset Your Password</h3>
    <p>Click <a href="${resetURL}">here</a> to reset your password.</p>`;

    await sendEmail(user.email, 'Password Reset Request', html);
    sendResponse(res, 200, true, 'Password reset email sent');
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return sendResponse(res, 404, false, 'Invalid token');

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    sendResponse(res, 200, true, 'Password reset successful');
  } catch (err) {
    next(err);
  }
};

module.exports = {
    signUp,
    login,
    forgotPassword,
    resetPassword
}