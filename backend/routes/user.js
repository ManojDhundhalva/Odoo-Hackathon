import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as controller from '../controller/user_controller.js';
import { authenticateToken } from '../config/authMiddleware.js';

dotenv.config();
const router = express.Router();

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    allowedHeaders: ['Authorization', 'Content-Type', 'Role'],
  };
  
router.use(cors(corsOptions));



export default router;