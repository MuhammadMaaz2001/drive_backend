import express from 'express';
import { uploadFile,searchFiles, deleteFile  } from '../controllers/file.controller.js';
import upload from '../middlewares/multer.js';
import { protect } from '../middlewares/auth.js';
import multer from 'multer'; 

const router = express.Router();

router.post('/upload', protect, upload.single('file'), uploadFile);
router.get('/search', searchFiles);  // Search files
router.delete('/:fileId', deleteFile);  // Delete file

export default router;
