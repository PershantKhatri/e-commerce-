const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const generateOrderNumber = require('../utils/generateOrderNumber');
const sendResponse = require('../utils/response');

// @desc Create New Order & Checkout
// @route POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { shippingAddress, phone, paymentMethod = 'COD' } = req.body;
    
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return sendResponse(res, 400, false, 'Your cart is empty.', null, 'EMPTY_CART');
    }

    const orderItems = [];
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);
      if (!product || product.stockQuantity < item.quantity) {
        return sendResponse(res, 400, false, `Product ${item.product.name} is out of stock.`, null, 'STOCK_ERROR');
      }

      product.stockQuantity -= item.quantity;
      await product.save();

      orderItems.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        price: item.price,
        image: product.images[0]
      });
    }

    const order = await Order.create({
      orderNumber: generateOrderNumber(),
      user: req.user._id,
      orderItems,
      shippingAddress,
      phone,
      paymentMethod,
      paymentStatus: paymentMethod === 'Online' ? 'Paid' : 'Pending',
      subtotal: cart.subtotal,
      discount: cart.discount,
      shippingFee: cart.shippingFee,
      tax: cart.tax,
      totalAmount: cart.grandTotal
    });

    cart.items = [];
    cart.subtotal = 0;
    cart.discount = 0;
    cart.shippingFee = 0;
    cart.tax = 0;
    cart.grandTotal = 0;
    await cart.save();

    return sendResponse(res, 201, true, 'Order placed successfully.', order);
  } catch (error) {
    return sendResponse(res, 500, false, error.message, null, 'SERVER_ERROR');
  }
};

// @desc Get user orders
// @route GET /api/orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
    return sendResponse(res, 200, true, 'Orders fetched successfully.', orders);
  } catch (error) {
    return sendResponse(res, 500, false, error.message, null, 'SERVER_ERROR');
  }
};

module.exports = { createOrder, getUserOrders };