const Review = require('../models/Review');
const Product = require('../models/Product');
const Order = require('../models/Order');
const sendResponse = require('../utils/response');

// @desc Add Product Review
// @route POST /api/reviews
const createReview = async (req, res) => {
  try {
    const { productId, rating, reviewText } = req.body;

    const orders = await Order.find({ user: req.user._id, 'orderItems.product': productId, orderStatus: 'Delivered' });
    if (orders.length === 0) {
      return sendResponse(res, 403, false, 'You can only review products you have purchased and received.', null, 'UNAUTHORIZED_REVIEW');
    }

    const existingReview = await Review.findOne({ user: req.user._id, product: productId });
    if (existingReview) {
      return sendResponse(res, 400, false, 'You have already reviewed this product.', null, 'DUPLICATE_REVIEW');
    }

    const review = await Review.create({
      user: req.user._id,
      product: productId,
      rating,
      reviewText
    });

    const reviews = await Review.find({ product: productId });
    const numReviews = reviews.length;
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / numReviews;

    await Product.findByIdAndUpdate(productId, {
      rating: Number(avgRating.toFixed(1)),
      numReviews
    });

    return sendResponse(res, 201, true, 'Review added successfully.', review);
  } catch (error) {
    return sendResponse(res, 500, false, error.message, null, 'SERVER_ERROR');
  }
};

module.exports = { createReview };