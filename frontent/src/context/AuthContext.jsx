import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const { data } = await API.get('/auth/profile');
          setUser(data.data || data);
        } catch (error) {
          console.error("Session expired or invalid token", error);
          logout();
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      const { data } = await API.post('/auth/login', { email, password });
      const authToken = data.token || data.data?.token;
      const userData = data.user || data.data?.user;

      localStorage.setItem('token', authToken);
      setToken(authToken);
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (name, email, password, confirmPassword, phone) => {
    try {
      const { data } = await API.post('/auth/register', {
        name, email, password, confirmPassword, phone
      });
      const authToken = data.token || data.data?.token;
      const userData = data.user || data.data?.user;

      if (authToken) {
        localStorage.setItem('token', authToken);
        setToken(authToken);
        setUser(userData);
      }
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);