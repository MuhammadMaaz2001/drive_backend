import express from 'express';
import { registerUser, loginUser, logoutUser ,forgotPassword,
    resetPassword,
    changePassword } from '../controllers/user.controller.js';
    import { protect } from '../middlewares/auth.js';



const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/change-password', protect, changePassword);

router.post('/make-admin/:userId', protect, async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        { role: 'admin' },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User promoted to admin', user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: 'Error promoting user', error: error.message });
    }
  });

export default router;
