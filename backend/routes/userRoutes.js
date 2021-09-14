import express from 'express';
const router = express.Router();
import { authUser, registerUser, getUserProfile } from '../controllers/userControllers.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser)
router.post('/login', authUser );
// To implement middleware, we put 'protect' as the first argument.
router.route('/profile').get(protect, getUserProfile)

export default router;
