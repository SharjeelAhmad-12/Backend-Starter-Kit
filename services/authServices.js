const authService =(User, bcrypt, generateToken, generateRefreshToken,sendEmail,sendOTP)=>(
{
  async signup(data) {
    const { name, email, password, role } = data;
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("Email already in use");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role, isVerified: false });

    const otp = await sendOTP(newUser._id, newUser.email);
    newUser.otp = otp;
    await newUser.save();

    const token = generateToken({ id: newUser._id, email: newUser.email, role: newUser.role });
    const refreshToken = generateRefreshToken({ id: newUser._id, email: newUser.email, role: newUser.role });

    return {
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token,
      refreshToken,
    };
  },

  async login(data) {
    const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User Not Found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid Credentials");

    const token = generateToken({ id: user._id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id, email: user.email, role: user.role });

    return {
      token,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },

  async forgetPassword(email) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User Not Found");

    const otp = Math.floor(1000 + Math.random() * 9000);
    user.otp = otp;
    await user.save();

    const html = `<h2>Password Reset OTP</h2><p>Your OTP is: <strong>${otp}</strong></p>`;
    await sendEmail(user.email, "Password Reset OTP", html);
  },

  async resetPassword(email, OTP, password) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User Not Found");
    if (Number(OTP) !== user.otp) throw new Error("Invalid OTP");

    user.password = await bcrypt.hash(password, 10);
    user.otp = null;
    await user.save();
  },

  async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId).select("+password");
    if (!user) throw new Error("User Not Found");

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new Error("Incorrect current password");

    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) throw new Error("New password cannot be the same");

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    const accessToken = generateToken({ id: user._id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id, email: user.email, role: user.role });

    return { accessToken, refreshToken };
  },

  refreshAccessToken(token) {
    if (!token) throw new Error("No refresh token found");

    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);

    return generateToken({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });
  },
});


module.exports = authService;