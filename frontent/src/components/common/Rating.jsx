import React from 'react';
import { Star } from 'lucide-react';

export const Rating = ({ value = 0, text = '' }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={`${
            value >= star
              ? 'text-yellow-400 fill-yellow-400'
              : value >= star - 0.5
              ? 'text-yellow-400 fill-yellow-400 opacity-75'
              : 'text-gray-300'
          }`}
        />
      ))}
      {text && <span className="text-sm text-gray-500 ml-1">({text})</span>}
    </div>
  );
};