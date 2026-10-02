const Product = require('../models/Product');
const sendResponse = require('../utils/response');

// @desc Get all products with filters, sorting, search, and pagination
// @route GET /api/products
const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 20, category, subcategory, brand, minPrice, maxPrice, sort, search } = req.query;
    
    let query = { status: 'active' };

    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    if (brand) query.brand = brand;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$text = { $search: search };
    }

    let queryExec = Product.find(query);

    // Sorting
    if (sort) {
      const sortBy = sort.split(',').join(' ');
      queryExec = queryExec.sort(sortBy);
    } else {
      queryExec = queryExec.sort('-createdAt');
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    queryExec = queryExec.skip(skip).limit(limitNum);

    const products = await queryExec;
    const total = await Product.countDocuments(query);

    return sendResponse(res, 200, true, 'Products fetched successfully.', {
      products,
      pagination: {
        totalProducts: total,
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        limit: limitNum
      }
    });
  } catch (error) {
    return sendResponse(res, 500, false, error.message, null, 'SERVER_ERROR');
  }
};

// @desc Get single product by ID
// @route GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return sendResponse(res, 404, false, 'Product not found.', null, 'NOT_FOUND');
    }
    return sendResponse(res, 200, true, 'Product fetched successfully.', product);
  } catch (error) {
    return sendResponse(res, 500, false, error.message, null, 'SERVER_ERROR');
  }
};

// @desc Create product (Admin)
// @route POST /api/admin/products
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return sendResponse(res, 201, true, 'Product added successfully.', product);
  } catch (error) {
    return sendResponse(res, 500, false, error.message, null, 'SERVER_ERROR');
  }
};

module.exports = { getProducts, getProductById, createProduct };