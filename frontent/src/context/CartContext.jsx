import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], subtotal: 0, total: 0 });
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  // Fetch Cart Items from backend
  const fetchCart = async () => {
    if (!token) {
      setCart({ items: [], subtotal: 0, total: 0 });
      return;
    }
    try {
      setLoading(true);
      const { data } = await API.get('/cart');
      setCart(data.data || data);
    } catch (error) {
      console.error("Error fetching cart", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  // Add to Cart Function
  const addToCart = async (productId, quantity = 1) => {
    try {
      const { data } = await API.post('/cart', { productId, quantity });
      setCart(data.data || data);
      return { success: true, message: "Item added to cart successfully!" };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to add item to cart' 
      };
    }
  };

  // Remove from Cart
  const removeFromCart = async (productId) => {
    try {
      const { data } = await API.delete(`/cart/${productId}`);
      setCart(data.data || data);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to remove item' 
      };
    }
  };

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, removeFromCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);