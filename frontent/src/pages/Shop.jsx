import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { ProductGrid } from '../components/product/ProductGrid';
import { Search, Filter } from 'lucide-react';

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url = '/products?';
      if (searchQuery) url += `search=${searchQuery}&`;
      if (category) url += `category=${category}&`;

      const { data } = await API.get(url);
      setProducts(data.data?.products || data.products || data.data || []);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Explore Catalog</h1>
        
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex w-full md:w-96">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          />
          <button type="submit" className="bg-primary-600 text-white px-4 rounded-r-lg hover:bg-primary-700 transition">
            <Search size={18} />
          </button>
        </form>
      </div>

      {/* Product Display Grid */}
      <ProductGrid products={products} loading={loading} />
    </div>
  );
};