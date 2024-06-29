import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as controller from '../controller/user_controller.js';
import { authenticateUserToken } from '../config/authMiddleware.js';

dotenv.config();
const router = express.Router();

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    allowedHeaders: ['Authorization', 'Content-Type', 'Role'],
  };
  
router.use(cors(corsOptions));

router.get('/available-disposers', authenticateUserToken, controller.available_disposers);
router.post('/check-availability', authenticateUserToken, controller.check_availability);
router.post('/book-appointment', authenticateUserToken, controller.book_appointment);
router.get('/history', authenticateUserToken, controller.history);

export default router;