import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-4">E-Shop</h3>
          <p className="text-sm text-gray-400">Your trusted destination for quality full-stack products, secure payments, and fast delivery.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/shop" className="hover:text-white">Shop All</a></li>
            <li><a href="/cart" className="hover:text-white">Cart</a></li>
            <li><a href="/wishlist" className="hover:text-white">Wishlist</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Customer Service</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
            <li><a href="#" className="hover:text-white">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-white">Returns & Refunds</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Stay Connected</h4>
          <p className="text-sm text-gray-400 mb-2">Subscribe to get special offers and updates.</p>
          <input type="email" placeholder="Enter your email" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm mb-2 text-white focus:outline-none" />
          <button className="w-full bg-primary-600 text-white py-2 rounded text-sm hover:bg-primary-700 transition">Subscribe</button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
        &copy; 2026 E-Shop. All rights reserved.
      </div>
    </footer>
  );
};