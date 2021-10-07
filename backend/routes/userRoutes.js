import express from 'express';
/* eslint-disable */
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userControllers.js';
import { protect } from '../middleware/authMiddleware.js';
/* eslint-disable */

const router = express.Router();
router.route('/').post(registerUser);
router.post('/login', authUser);
// To implement middleware, we put 'protect' as the first argument.
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
