import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, enum: ['upload', 'delete'], required: true },
  target: { type: String, enum: ['file', 'folder'], required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('ActivityLog', activityLogSchema);
