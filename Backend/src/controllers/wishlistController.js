const Wishlist = require('../models/Wishlist');
const sendResponse = require('../utils/response');

// @desc Get user wishlist
// @route GET /api/wishlist
const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    }
    return sendResponse(res, 200, true, 'Wishlist fetched successfully.', wishlist);
  } catch (error) {
    return sendResponse(res, 500, false, error.message, null, 'SERVER_ERROR');
  }
};

// @desc Toggle product in wishlist
// @route POST /api/wishlist
const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [productId] });
      return sendResponse(res, 201, true, 'Added to wishlist.', wishlist);
    }

    const index = wishlist.products.indexOf(productId);
    if (index > -1) {
      wishlist.products.splice(index, 1);
      await wishlist.save();
      return sendResponse(res, 200, true, 'Removed from wishlist.', wishlist);
    } else {
      wishlist.products.push(productId);
      await wishlist.save();
      return sendResponse(res, 200, true, 'Added to wishlist.', wishlist);
    }
  } catch (error) {
    return sendResponse(res, 500, false, error.message, null, 'SERVER_ERROR');
  }
};

module.exports = { getWishlist, toggleWishlist };