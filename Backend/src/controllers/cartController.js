const Cart = require('../models/Cart');
const Product = require('../models/Product');
const sendResponse = require('../utils/response');

const calculateCartTotals = (items) => {
  let subtotal = 0;
  let discount = 0;
  
  items.forEach(item => {
    subtotal += item.price * item.quantity;
  });

  const shippingFee = subtotal > 500 || subtotal === 0 ? 0 : 50;
  const tax = Number((subtotal * 0.05).toFixed(2));
  const grandTotal = subtotal - discount + shippingFee + tax;

  return { subtotal, discount, shippingFee, tax, grandTotal };
};

// @desc Get user cart
// @route GET /api/cart
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }
    return sendResponse(res, 200, true, 'Cart fetched successfully.', cart);
  } catch (error) {
    return sendResponse(res, 500, false, error.message, null, 'SERVER_ERROR');
  }
};

// @desc Add item to cart
// @route POST /api/cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return sendResponse(res, 404, false, 'Product not found.', null, 'NOT_FOUND');
    }

    if (product.stockQuantity < quantity) {
      return sendResponse(res, 400, false, 'Product is out of stock or insufficient quantity.', null, 'STOCK_ERROR');
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(p => p.product.toString() === productId);
    const itemPrice = product.discountPrice > 0 ? product.discountPrice : product.price;

    if (itemIndex > -1) {
      let newQty = cart.items[itemIndex].quantity + Number(quantity);
      if (product.stockQuantity < newQty) {
        return sendResponse(res, 400, false, 'Requested quantity exceeds available stock.', null, 'STOCK_ERROR');
      }
      cart.items[itemIndex].quantity = newQty;
    } else {
      cart.items.push({ product: productId, quantity: Number(quantity), price: itemPrice });
    }

    const totals = calculateCartTotals(cart.items);
    cart.subtotal = totals.subtotal;
    cart.discount = totals.discount;
    cart.shippingFee = totals.shippingFee;
    cart.tax = totals.tax;
    cart.grandTotal = totals.grandTotal;

    await cart.save();
    cart = await cart.populate('items.product');

    return sendResponse(res, 200, true, 'Product added to cart successfully.', cart);
  } catch (error) {
    return sendResponse(res, 500, false, error.message, null, 'SERVER_ERROR');
  }
};

// @desc Remove item from cart
// @route DELETE /api/cart/:productId
const removeFromCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return sendResponse(res, 404, false, 'Cart not found.', null, 'NOT_FOUND');
    }

    cart.items = cart.items.filter(p => p.product.toString() !== req.params.productId);

    const totals = calculateCartTotals(cart.items);
    cart.subtotal = totals.subtotal;
    cart.discount = totals.discount;
    cart.shippingFee = totals.shippingFee;
    cart.tax = totals.tax;
    cart.grandTotal = totals.grandTotal;

    await cart.save();
    cart = await cart.populate('items.product');

    return sendResponse(res, 200, true, 'Item removed from cart.', cart);
  } catch (error) {
    return sendResponse(res, 500, false, error.message, null, 'SERVER_ERROR');
  }
};

module.exports = { getCart, addToCart, removeFromCart };