const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProductById, 
  createProduct 
} = require('../controllers/productController');

router.route('/')
  .get(getProducts)
  .post(createProduct); // Filhal direct function pass karein bina undefined middleware ke

router.get('/:id', getProductById);

module.exports = router;