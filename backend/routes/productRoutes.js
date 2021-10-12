import express from 'express';
/* eslint-disable */
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  createProductReview,
  getTopProducts
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
/* eslint-disable */

const router = express.Router();

// .get is basically a get request
router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)
router.route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router;
