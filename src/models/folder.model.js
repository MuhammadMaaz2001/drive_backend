
import mongoose from 'mongoose';

const folderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    parentFolderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: null }, // For nesting folders
  },
  { timestamps: true }
);

const Folder = mongoose.model('Folder', folderSchema);

export default Folder;
