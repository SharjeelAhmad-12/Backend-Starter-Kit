const authService = ({ User, bcrypt, jwt, tokenUtils, sendEmail, sendOTP }) => {
  const signup = async ({ name, email, password, role }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("Email already in use");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      isVerified: false,
    });

    const otp = await sendOTP(newUser._id, newUser.email);
    newUser.otp = otp;
    await newUser.save();

    const token = tokenUtils.generateToken({
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    });
    const refreshToken = tokenUtils.generateRefreshToken({
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    });

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
  };

  const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User Not Found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid Credentials");

    const token = tokenUtils.generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = tokenUtils.generateRefreshToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
      refreshToken,
    };
  };

  const forgetPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User Not Found");

    const otp = Math.floor(1000 + Math.random() * 9000);
    user.otp = otp;
    await user.save();

    const html = `<h2>Password Reset OTP</h2><p>Your OTP is: <strong>${otp}</strong></p>`;
    await sendEmail(user.email, "Password Reset OTP", html);
  };

  const resetPassword = async (email, OTP, newPassword) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User Not Found");
    if (Number(OTP) !== user.otp) throw new Error("Invalid OTP");

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null;
    await user.save();
  };

  const changePassword = async (userId, currentPassword, newPassword) => {
    const user = await User.findById(userId).select("+password");
    if (!user) throw new Error("User Not Found");

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new Error("Incorrect current password");

    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) throw new Error("New password cannot be same as current");

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    const accessToken = tokenUtils.generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = tokenUtils.generateRefreshToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    return { accessToken, refreshToken };
  };

  const refreshAccessToken = (token) => {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    return tokenUtils.generateToken({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });
  };

  return {
    signup,
    login,
    forgetPassword,
    resetPassword,
    changePassword,
    refreshAccessToken,
  };
};

module.exports = authService;
