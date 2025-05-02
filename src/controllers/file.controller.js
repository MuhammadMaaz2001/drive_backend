import cloudinary from '../utils/cloudinary.js';
import File from '../models/file.model.js';
import Folder from '../models/folder.model.js';  
import ActivityLog from '../models/activitylogs.model.js';
import streamifier from 'streamifier';

export const uploadFile = async (req, res) => {
  const file = req.file;
  const userId = req.user._id;
  const { folderId } = req.body;  // Get folder ID from request body

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const streamUpload = () => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto', folder: 'uploads' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      streamifier.createReadStream(file.buffer).pipe(stream);
    });
  };

  try {
    const result = await streamUpload();

    // Check if folder exists
    if (folderId) {
      const folder = await Folder.findById(folderId);
      if (!folder) {
        return res.status(404).json({ message: 'Folder not found' });
      }
    }

    const savedFile = await File.create({
      fileName: file.originalname,
      fileType: file.mimetype,
      fileUrl: result.secure_url,
      size: file.size,
      uploadedBy: userId,
      folderId: folderId || null,  // Associate file with folder if provided
    });

    await ActivityLog.create({
      user: userId,
      action: 'upload',
      target: 'file',
      targetId: savedFile._id,
    });

    return res.status(201).json({ message: 'File uploaded', file: savedFile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};



export const searchFiles = async (req, res) => {
    const { query } = req.query;  // Get search query from request
  
    try {
      const files = await File.find({
        $or: [
          { fileName: { $regex: query, $options: 'i' } },
          { fileType: { $regex: query, $options: 'i' } },
        ],
      });
      return res.status(200).json(files);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error searching files' });
    }
  };
  
  export const deleteFile = async (req, res) => {
    const { fileId } = req.params;
  
    try {
      const file = await File.findById(fileId);
      if (!file) {
        return res.status(404).json({ message: 'File not found' });
      }
  
      await File.deleteOne({ _id: fileId });
      return res.status(200).json({ message: 'File deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error deleting file' });
    }
  };