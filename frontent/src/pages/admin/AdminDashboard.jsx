import React from 'react';

export const AdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 border rounded-xl shadow-sm">
          <h4 className="text-gray-500 text-sm">Total Revenue</h4>
          <p className="text-2xl font-bold text-gray-900 mt-1">$12,450</p>
        </div>
        <div className="bg-white p-6 border rounded-xl shadow-sm">
          <h4 className="text-gray-500 text-sm">Total Orders</h4>
          <p className="text-2xl font-bold text-gray-900 mt-1">142</p>
        </div>
        <div className="bg-white p-6 border rounded-xl shadow-sm">
          <h4 className="text-gray-500 text-sm">Total Products</h4>
          <p className="text-2xl font-bold text-gray-900 mt-1">1,000+</p>
        </div>
      </div>
    </div>
  );
};