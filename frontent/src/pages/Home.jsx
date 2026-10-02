import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { ProductGrid } from '../components/product/ProductGrid';
import { Button } from '../components/common/Button';
import { ArrowRight, ShieldCheck, Truck, Headphones, RefreshCw } from 'lucide-react';

export const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await API.get('/products?featured=true&limit=8');
        setFeaturedProducts(data.data?.products || data.products || data.data || []);
      } catch (error) {
        console.error("Error fetching featured products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 px-4 sm:px-6 lg:px-8 rounded-2xl max-w-7xl mx-auto mt-6 flex flex-col items-center text-center">
        <span className="bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-4">New Collection 2026</span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 max-w-3xl">
          Discover Quality Products Built for Your Lifestyle
        </h1>
        <p className="text-gray-300 text-lg max-w-xl mb-8">
          Explore top-tier electronics, fashion, and home essentials with seamless shopping and secure checkout.
        </p>
        <Link to="/shop">
          <Button className="flex items-center space-x-2 text-base px-6 py-3">
            <span>Shop Now</span>
            <ArrowRight size={18} />
          </Button>
        </Link>
      </section>

      {/* Features Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
          <Truck className="text-primary-600" size={32} />
          <div>
            <h4 className="font-semibold text-gray-900">Free Shipping</h4>
            <p className="text-xs text-gray-500">On all orders over $50</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
          <ShieldCheck className="text-primary-600" size={32} />
          <div>
            <h4 className="font-semibold text-gray-900">Secure Payment</h4>
            <p className="text-xs text-gray-500">100% protected payments</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
          <RefreshCw className="text-primary-600" size={32} />
          <div>
            <h4 className="font-semibold text-gray-900">Easy Returns</h4>
            <p className="text-xs text-gray-500">30-day money-back guarantee</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
          <Headphones className="text-primary-600" size={32} />
          <div>
            <h4 className="font-semibold text-gray-900">24/7 Support</h4>
            <p className="text-xs text-gray-500">Dedicated customer service</p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <Link to="/shop" className="text-primary-600 font-medium hover:underline text-sm">View All</Link>
        </div>
        <ProductGrid products={featuredProducts} loading={loading} />
      </section>
    </div>
  );
};