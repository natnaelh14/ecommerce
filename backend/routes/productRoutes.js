import express from 'express';
/* eslint-disable */
import {
  getProductById,
  getProducts,
} from '../controllers/productController.js';
/* eslint-disable */

const router = express.Router();

// .get is basically a get request
router.route('/').get(getProducts);

router.route('/:id').get(getProductById);

export default router;
