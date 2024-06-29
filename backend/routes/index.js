import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './user.js';
import disposerRouter from './disposer.js';
import * as controller from '../controller/index_controller.js';
import { authenticateToken } from '../config/authMiddleware.js';
import User from '../models/user.js';

dotenv.config();
const router = express.Router();

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    allowedHeaders: ['Authorization', 'Content-Type', 'Role'],
  };
  
router.use(cors(corsOptions));

router.get('/', (req, res) => {
  return res.json('Hello!');
})
router.use('/user', userRouter);
router.use('/disposer', disposerRouter);
router.post('/create-session', controller.create_session);
router.get('/profile', authenticateToken, controller.profile);
router.get('/profile/id', authenticateToken, controller.disposer_profile);
router.post('/update-profile', authenticateToken, controller.update_profile);
router.get('/checkUsername', authenticateToken, controller.checkUsername);

export default router;