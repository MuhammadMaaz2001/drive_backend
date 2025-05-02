
import express from 'express';
import {
  getAllUsers,
  getUserFiles,
  getActivityLogs,
} from '../controllers/admin.controller.js';
import { protect , isAdmin } from '../middlewares/auth.js';


const router = express.Router();

router.use(protect, isAdmin);

router.get('/users', getAllUsers);
router.get('/users/:userId/files', getUserFiles);
router.get('/logs', getActivityLogs);

export default router;
