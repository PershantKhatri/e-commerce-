const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const sendResponse = require('../utils/response');

// @desc Get all categories
// @route GET /api/categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});
    return sendResponse(res, 200, true, 'Categories fetched successfully.', categories);
  } catch (error) {
    return sendResponse(res, 500, false, error.message, null, 'SERVER_ERROR');
  }
});

module.exports = router;