import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search } from 'lucide-react';

export const Navbar = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary-600">
          E-Shop
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search products, categories..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
          </div>
        </div>

        {/* Navigation Icons */}
        <div className="flex items-center space-x-6">
          <Link to="/wishlist" className="text-gray-600 hover:text-primary-600 relative">
            <Heart size={22} />
            <span className="absolute -top-1 -right-2 bg-primary-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
          </Link>
          <Link to="/cart" className="text-gray-600 hover:text-primary-600 relative">
            <ShoppingCart size={22} />
            <span className="absolute -top-1 -right-2 bg-primary-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
          </Link>
          <Link to="/profile" className="text-gray-600 hover:text-primary-600">
            <User size={22} />
          </Link>
        </div>
      </div>
    </header>
  );
};