import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Rating } from '../common/Rating';

export const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group flex flex-col">
      {/* Product Image & Wishlist Badge */}
      <div className="relative bg-gray-100 h-48 overflow-hidden">
        <Link to={`/product/${product?._id}`}>
          <img
            src={product?.images?.[0] || 'https://via.placeholder.com/300'}
            alt={product?.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        </Link>
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-50 text-gray-600 hover:text-red-500 transition">
          <Heart size={16} />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">{product?.category}</span>
          <Link to={`/product/${product?._id}`}>
            <h3 className="font-medium text-gray-800 mt-1 line-clamp-1 hover:text-primary-600 transition">{product?.name}</h3>
          </Link>
          <div className="mt-1">
            <Rating value={product?.rating || 0} text={product?.numReviews || 0} />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">${product?.price}</span>
            {product?.discountPrice && (
              <span className="text-xs text-gray-400 line-through ml-2">${product?.discountPrice}</span>
            )}
          </div>
          <button className="bg-primary-50 text-primary-600 p-2 rounded-lg hover:bg-primary-600 hover:text-white transition">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};