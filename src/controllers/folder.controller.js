
import Folder from '../models/folder.model.js';

export const createFolder = async (req, res) => {
  const { name, parentFolderId } = req.body;
  const userId = req.user._id;

  try {
    const folder = new Folder({
      name,
      createdBy: userId,
      parentFolderId: parentFolderId || null,
    });
    
    await folder.save();
    return res.status(201).json({ message: 'Folder created successfully', folder });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error creating folder' });
  }
};

export const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find().populate('createdBy', 'name email');
    return res.status(200).json(folders);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching folders' });
  }
};

export const getFolderById = async (req, res) => {
  const { folderId } = req.params;

  try {
    const folder = await Folder.findById(folderId).populate('createdBy', 'name email');
    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }
    return res.status(200).json(folder);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching folder' });
  }
};
