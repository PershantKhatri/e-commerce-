const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/adminController');
const { createProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.get('/dashboard', protect, admin, getDashboardStats);
router.post('/products', protect, admin, createProduct);

module.exports = router;