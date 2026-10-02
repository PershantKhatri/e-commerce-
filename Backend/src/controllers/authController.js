const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const sendResponse = require('../utils/response');

// @desc Register User
// @route POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;
    
    if (password !== confirmPassword) {
      return sendResponse(res, 400, false, 'Passwords do not match.', null, 'VALIDATION_ERROR');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return sendResponse(res, 409, false, 'Email is already registered.', null, 'CONFLICT_ERROR');
    }

    const user = await User.create({ name, email, phone, password });
    if (user) {
      return sendResponse(res, 201, true, 'Account created successfully.', {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: generateToken(user._id)
      });
    }
  } catch (error) {
    return sendResponse(res, 500, false, error.message, null, 'SERVER_ERROR');
  }
};

// @desc Login User
// @route POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      return sendResponse(res, 200, true, 'Login successful.', {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      return sendResponse(res, 401, false, 'Invalid email or password.', null, 'AUTHENTICATION_ERROR');
    }
  } catch (error) {
    return sendResponse(res, 500, false, error.message, null, 'SERVER_ERROR');
  }
};

// @desc Get User Profile
// @route GET /api/auth/profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    return sendResponse(res, 200, true, 'Profile fetched successfully.', user);
  } catch (error) {
    return sendResponse(res, 500, false, error.message, null, 'SERVER_ERROR');
  }
};

module.exports = { registerUser, loginUser, getUserProfile };