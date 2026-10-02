import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/common/Button';
import { Trash2, ShoppingBag } from 'lucide-react';

export const Cart = () => {
  const { cart, removeFromCart, loading } = useCart();
  const navigate = useNavigate();

  const items = cart?.items || [];
  const subtotal = cart?.subtotal || items.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <ShoppingBag size={64} className="mx-auto text-gray-300" />
        <h2 className="text-2xl font-bold text-gray-800">Your Cart is Empty</h2>
        <p className="text-gray-500">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop">
          <Button className="mt-4">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product?._id || item._id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="flex items-center space-x-4">
                <img
                  src={item.product?.images?.[0] || 'https://via.placeholder.com/100'}
                  alt={item.product?.name}
                  className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{item.product?.name}</h3>
                  <p className="text-sm text-primary-600 font-bold mt-1">${item.product?.price}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <span className="text-sm font-medium text-gray-600">Qty: {item.quantity}</span>
                <button
                  onClick={() => removeFromCart(item.product?._id)}
                  className="text-gray-400 hover:text-red-600 transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Box */}
        <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm h-fit space-y-4">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-3">Order Summary</h3>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Shipping</span>
            <span className="font-semibold text-green-600">Free</span>
          </div>
          <div className="border-t pt-3 flex justify-between text-base font-bold text-gray-900">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <Button onClick={() => navigate('/checkout')} className="w-full mt-4">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};