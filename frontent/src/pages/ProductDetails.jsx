import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import { useCart } from '../context/CartContext';
import { Button } from '../components/common/Button';
import { Rating } from '../components/common/Rating';
import { Loader } from '../components/common/Loader';
import { ShoppingCart, Heart, CheckCircle } from 'lucide-react';

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data.data || data);
      } catch (error) {
        console.error("Error fetching product details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const res = await addToCart(product._id, quantity);
    if (res.success) {
      setMessage("Product added to cart successfully!");
    } else {
      setMessage(res.message);
    }
  };

  if (loading) return <Loader />;
  if (!product) return <div className="text-center py-20 text-gray-500">Product not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 h-96 flex items-center justify-center">
          <img
            src={product?.images?.[0] || 'https://via.placeholder.com/400'}
            alt={product?.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-semibold text-primary-600 uppercase tracking-widest">{product?.category}</span>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-1">{product?.name}</h1>
            <div className="mt-2">
              <Rating value={product?.rating || 0} text={`${product?.numReviews || 0} reviews`} />
            </div>
          </div>

          <div className="text-3xl font-bold text-gray-900">
            ${product?.price}
            {product?.discountPrice && (
              <span className="text-lg text-gray-400 line-through ml-3">${product?.discountPrice}</span>
            )}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">{product?.description}</p>

          {message && (
            <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg text-sm">
              <CheckCircle size={18} />
              <span>{message}</span>
            </div>
          )}

          <div className="flex items-center space-x-4 pt-4">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              >-</button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              >+</button>
            </div>

            <Button onClick={handleAddToCart} className="flex-1 flex items-center justify-center space-x-2">
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};