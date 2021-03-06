import asyncHandler from 'express-async-handler';
/* eslint-disable */
import Product from "../models/productModel.js";
/* eslint-disable */

// @desc - Fetch all products
// @route - GET /api/products
// @access - Public
const getProducts = asyncHandler(async (req, res) => {
  // It means how many per page do you want
  const pageSize = 8;
  // Getting page from query
  const page = Number(req.query.pageNumber) || 1
  // Search Keyword
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          // It means it is case-insensitive
          $options: "i",
        },
      }
    : {};
  // Get Total count of products
  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

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
    throw new Error("Product not found.");
  }
});

// @desc - Delete a product
// @route - DELETE /api/products/:id
// @access - Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product Removed" });
  } else {
    // if you don't specify status, it will default to 500.
    res.status(404);
    throw new Error("Product not found.");
  }
});

// @desc - Create a product
// @route - POST /api/products
// @access - Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image:
      "https://res.cloudinary.com/doalzf6o2/image/upload/v1633891721/sample_dtajuq.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc - Update a product
// @route - PUT /api/products/:id
// @access - Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
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
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    // We are checking, if a product is already reviewed.
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Get Top Rated Products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  // ascending order is -1 and limit it to 3 products
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  res.json(products)
});

export {
  getProducts,
  getProductById,
  getTopProducts,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
};
