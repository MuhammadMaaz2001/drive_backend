
import express from 'express';
import { createFolder, getFolders, getFolderById } from '../controllers/folder.controller.js';
import { protect } from '../middlewares/auth.js';
const router = express.Router();

router.post('/', protect,createFolder);  
router.get('/', getFolders);     
router.get('/:folderId', getFolderById);

export default router;
