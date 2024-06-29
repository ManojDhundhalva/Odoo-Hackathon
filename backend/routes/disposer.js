import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as controller from '../controller/disposer_controller.js';
import { authenticateDisposerToken } from '../config/authMiddleware.js';

dotenv.config();
const router = express.Router();

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    allowedHeaders: ['Authorization', 'Content-Type', 'Role'],
  };
  
router.use(cors(corsOptions));

router.get('/tasks', authenticateDisposerToken, controller.tasks);
router.post('/update-status', authenticateDisposerToken, controller.updateStatus);
router.get('/history', authenticateDisposerToken, controller.history);
router.post('/add-waste', authenticateDisposerToken, controller.addWaste);

export default router;