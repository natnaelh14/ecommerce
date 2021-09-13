import express from 'express';
const router = express.Router();
import { authUser } from '../controllers/userControllers';

router.post('/login', authUser )

export default router;
