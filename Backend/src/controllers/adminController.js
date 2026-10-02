const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const sendResponse = require('../utils/response');

// @desc Get Admin Dashboard Statistics
// @route GET /api/admin/dashboard
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const revenueData = await Order.aggregate([
      { $match: { paymentStatus: 'Paid' } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    const pendingOrders = await Order.countDocuments({ orderStatus: 'Pending' });
    const deliveredOrders = await Order.countDocuments({ orderStatus: 'Delivered' });
    const cancelledOrders = await Order.countDocuments({ orderStatus: 'Cancelled' });
    const lowStockProducts = await Product.countDocuments({ stockQuantity: { $lt: 10 } });

    const recentOrders = await Order.find().sort('-createdAt').limit(5).populate('user', 'name email');
    const recentUsers = await User.find().sort('-createdAt').limit(5).select('-password');

    return sendResponse(res, 200, true, 'Dashboard stats fetched successfully.', {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      pendingOrders,
      deliveredOrders,
      cancelledOrders,
      lowStockProducts,
      recentOrders,
      recentUsers
    });
  } catch (error) {
    return sendResponse(res, 500, false, error.message, null, 'SERVER_ERROR');
  }
};

module.exports = { getDashboardStats };