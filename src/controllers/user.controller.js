import User from '../models/user.model.js';
import { generateToken } from '../utils/generateToken.js';
import crypto from 'crypto';
import { generateResetToken } from '../utils/generateResetToken.js';
import { sendEmail } from '../utils/sendEmail.js';



// @desc    Register User
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password });

    const token = generateToken(user._id);
    res.status(201).json({ token, user: { _id: user._id, name, email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};

// @desc    Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.status(200).json({ token, user: { _id: user._id, name: user.name, email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

// @desc    Logout (for frontend: just remove token from storage)
export const logoutUser = (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out successfully' });
};



// @desc    Forgot Password
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const { resetToken, hashedToken, expire } = generateResetToken();
  
      user.resetPasswordToken = hashedToken;
      user.resetPasswordExpire = expire;
      await user.save();
  
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
      const message = `Reset your password using the following link: \n\n ${resetUrl}`;
      await sendEmail(user.email, 'Password Reset', message);
  
      res.status(200).json({ message: 'Reset email sent' });
    } catch (err) {
      res.status(500).json({ message: 'Email could not be sent', error: err.message });
    }
  };
  
  // @desc    Reset Password
  export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
  
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });
  
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
  
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
  
    res.status(200).json({ message: 'Password reset successful' });
  };
  
  // @desc    Change Password (while logged in)
  export const changePassword = async (req, res) => {
    const user = await User.findById(req.user._id);
    const { currentPassword, newPassword } = req.body;
  
    if (!user || !(await user.matchPassword(currentPassword))) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }
  
    user.password = newPassword;
    await user.save();
  
    res.status(200).json({ message: 'Password changed successfully' });
  };