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

// @desc - Delete a product
// @route - DELETE /api/products/:id
// @access - Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Product Removed' });
  } else {
    // if you don't specify status, it will default to 500.
    res.status(404);
    throw new Error('Product not found.');
  }
});

// @desc - Create a product
// @route - POST /api/products
// @access - Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product({
    name: 'Sample Name',
    price: 0,
    user: req.user._id,
    image: 'https://res.cloudinary.com/doalzf6o2/image/upload/v1633891721/sample_dtajuq.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description',
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc - Update a product
// @route - PUT /api/products/:id
// @access - Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    const updateProduct = await product.save();
    res.status(201).json(updateProduct);

  } else {
    res.status(404)
    throw new Error('Product not found');
  }


});


export { getProducts, getProductById, deleteProduct, updateProduct, createProduct };
