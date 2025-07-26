<<<<<<< HEAD

const authService = (User, bcrypt, generateToken, generateRefreshToken, sendEmail, sendOTP) => ({
  async signup(data) {
    const { name, email, password, role } = data;
=======
const authService = ({ User, bcrypt, jwt, tokenUtils, sendEmail, sendOTP }) => {
  const signup = async ({ name, email, password, role }) => {
>>>>>>> feature/auth-DI
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("Email already in use");

    const hashedPassword = await bcrypt.hash(password, 10);
<<<<<<< HEAD
    const newUser = await User.create({ name, email, password: hashedPassword, role, isVerified: false });
=======
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      isVerified: false,
    });
>>>>>>> feature/auth-DI

    const otp = await sendOTP(newUser._id, newUser.email);
    newUser.otp = otp;
    await newUser.save();

<<<<<<< HEAD
    const token = generateToken({ id: newUser._id, email: newUser.email, role: newUser.role });
    const refreshToken = generateRefreshToken({ id: newUser._id, email: newUser.email, role: newUser.role });
=======
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
>>>>>>> feature/auth-DI

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
<<<<<<< HEAD
  },

  async login(data) {
    const { email, password } = data;
=======
  };

  const login = async (email, password) => {
>>>>>>> feature/auth-DI
    const user = await User.findOne({ email });
    if (!user) throw new Error("User Not Found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid Credentials");

<<<<<<< HEAD
    const token = generateToken({ id: user._id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id, email: user.email, role: user.role });

    return {
      token,
      refreshToken,
=======
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
>>>>>>> feature/auth-DI
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
<<<<<<< HEAD
    };
  },

  async forgetPassword(email) {
=======
      token,
      refreshToken,
    };
  };

  const forgetPassword = async (email) => {
>>>>>>> feature/auth-DI
    const user = await User.findOne({ email });
    if (!user) throw new Error("User Not Found");

    const otp = Math.floor(1000 + Math.random() * 9000);
    user.otp = otp;
    await user.save();

    const html = `<h2>Password Reset OTP</h2><p>Your OTP is: <strong>${otp}</strong></p>`;
    await sendEmail(user.email, "Password Reset OTP", html);
<<<<<<< HEAD
  },

  async resetPassword(email, OTP, password) {
=======
  };

  const resetPassword = async (email, OTP, newPassword) => {
>>>>>>> feature/auth-DI
    const user = await User.findOne({ email });
    if (!user) throw new Error("User Not Found");
    if (Number(OTP) !== user.otp) throw new Error("Invalid OTP");

<<<<<<< HEAD
    user.password = await bcrypt.hash(password, 10);
    user.otp = null;
    await user.save();
  },

  async changePassword(userId, currentPassword, newPassword) {
=======
    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null;
    await user.save();
  };

  const changePassword = async (userId, currentPassword, newPassword) => {
>>>>>>> feature/auth-DI
    const user = await User.findById(userId).select("+password");
    if (!user) throw new Error("User Not Found");

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new Error("Incorrect current password");

    const isSame = await bcrypt.compare(newPassword, user.password);
<<<<<<< HEAD
    if (isSame) throw new Error("New password cannot be the same");
=======
    if (isSame) throw new Error("New password cannot be same as current");
>>>>>>> feature/auth-DI

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

<<<<<<< HEAD
    const accessToken = generateToken({ id: user._id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id, email: user.email, role: user.role });

    return { accessToken, refreshToken };
  },

  refreshAccessToken(token) {
    if (!token) throw new Error("No refresh token found");

    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);

    return generateToken({
=======
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
>>>>>>> feature/auth-DI
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });
<<<<<<< HEAD
  },
});
=======
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
>>>>>>> feature/auth-DI

module.exports = authService;
