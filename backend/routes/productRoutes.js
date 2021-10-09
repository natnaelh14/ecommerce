import express from 'express';
/* eslint-disable */
import {
  deleteProduct,
  getProductById,
  getProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
/* eslint-disable */

const router = express.Router();

// .get is basically a get request
router.route('/').get(getProducts);

router.route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)

export default router;
