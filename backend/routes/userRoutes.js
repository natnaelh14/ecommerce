import express from 'express';
/* eslint-disable */
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser
} from '../controllers/userControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js';
/* eslint-disable */

const router = express.Router();
router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser);
// To implement middleware, we put 'protect' as the first argument.
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router;
