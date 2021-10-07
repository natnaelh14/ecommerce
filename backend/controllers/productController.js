import asyncHandler from 'express-async-handler';
/* eslint-disable */
import Product from '../models/productModel.js';
/* eslint-disable */

// @desc - Fetch all products
// @route - GET /api/products
// @access - Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc - Fetch single product
// @route - GET /api/products/:id
// @access - Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    // if you don't specify status, it will default to 500.
    res.status(404);
    throw new Error('Product not found.');
  }
});

export { getProducts, getProductById };
