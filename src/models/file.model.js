import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  fileName: String,
  fileType: String,
  fileUrl: String,
  size: Number,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  folderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('File', fileSchema);
