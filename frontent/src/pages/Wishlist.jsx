import React from 'react';
import { Heart } from 'lucide-react';

export const Wishlist = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
      <Heart size={64} className="mx-auto text-gray-300" />
      <h2 className="text-2xl font-bold text-gray-800">Your Wishlist is Empty</h2>
      <p className="text-gray-500">Save your favorite items here to check them out later.</p>
    </div>
  );
};