
import User from '../models/user.model.js';
import File from '../models/file.model.js';
import ActivityLog from '../models/activitylogs.model.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
};

export const getUserFiles = async (req, res) => {
  const { userId } = req.params;

  try {
    const files = await File.find({ uploadedBy: userId });
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user files', error: err.message });
  }
};

export const getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch logs', error: err.message });
  }
};
