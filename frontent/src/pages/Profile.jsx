import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { Loader } from '../components/common/Loader';

export const Profile = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get('/orders/my-orders');
        setOrders(data.data || data);
      } catch (error) {
        console.error("Error fetching orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <div className="bg-white p-6 border border-gray-200 rounded-xl flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
          <p className="text-sm text-gray-500">{user?.email} | {user?.phone}</p>
        </div>
        <button onClick={logout} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition">
          Logout
        </button>
      </div>

      <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-gray-900">Order History</h3>
        {loading ? <Loader /> : orders.length === 0 ? (
          <p className="text-sm text-gray-500">No past orders found.</p>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order._id} className="border p-4 rounded-lg flex justify-between items-center text-sm">
                <div>
                  <span className="font-semibold text-gray-800">Order #{order.orderNumber}</span>
                  <p className="text-gray-500 text-xs">Status: {order.orderStatus}</p>
                </div>
                <span className="font-bold text-primary-600">${order.totalAmount}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};