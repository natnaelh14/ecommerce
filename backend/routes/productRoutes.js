import express from 'express';
const router = express.Router();
import { getProductById, getProducts } from '../controllers/productController.js';

//.get is basically a get request
router.route('/').get(getProducts)

router.route('/:id').get(getProductById)

export default router;
