import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useCart } from '../context/CartContext';
import { Button } from '../components/common/Button';

export const Checkout = () => {
  const { cart, fetchCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    country: 'Pakistan',
    city: 'Nawabshah',
    area: '',
    street: '',
    postalCode: '',
    phone: '',
    paymentMethod: 'Cash on Delivery'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const orderPayload = {
        shippingAddress: {
          country: formData.country,
          city: formData.city,
          area: formData.area,
          street: formData.street,
          postalCode: formData.postalCode
        },
        phone: formData.phone,
        paymentMethod: formData.paymentMethod,
        items: cart.items
      };

      await API.post('/orders', orderPayload);
      fetchCart(); // Clear local cart state context
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout & Shipping</h1>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6">{error}</div>}

      <form onSubmit={handleOrderSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 border border-gray-200 rounded-xl space-y-4 shadow-sm">
          <h3 className="font-bold text-gray-900 text-lg border-b pb-2">Shipping Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input type="text" name="city" required value={formData.city} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Area / Locality</label>
            <input type="text" name="area" required value={formData.area} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="e.g. Civil Lines" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
            <input type="text" name="street" required value={formData.street} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="House #, Street name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input type="text" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="03XXXXXXXXX" />
          </div>
        </div>

        <div className="bg-white p-6 border border-gray-200 rounded-xl space-y-6 shadow-sm h-fit">
          <h3 className="font-bold text-gray-900 text-lg border-b pb-2">Payment Method</h3>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer bg-gray-50">
              <input type="radio" name="paymentMethod" defaultChecked value="Cash on Delivery" />
              <span className="text-sm font-medium text-gray-800">Cash on Delivery (COD)</span>
            </label>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Processing Order...' : 'Place Order'}
          </Button>
        </div>
      </form>
    </div>
  );
};