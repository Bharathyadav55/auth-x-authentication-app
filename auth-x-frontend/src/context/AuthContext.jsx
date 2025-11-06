import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await api.get('/auth/checkAuth');
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  };

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success) {
      setUser(response.data.user);
    }
    return response.data;
  };

  const logout = async () => {
    await api.get('/auth/logout');
    setUser(null);
  };

  const verifyEmail = async (token) => {
    const response = await api.post('/auth/verifyEmail', { token });
    return response.data;
  };

  const forgotPassword = async (email) => {
    const response = await api.post('/auth/forgetPassword', { email });
    return response.data;
  };

  const resetPassword = async (token, password) => {
    const response = await api.post(`/auth/resetPassword/${token}`, { password });
    return response.data;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      register, 
      login, 
      logout, 
      verifyEmail, 
      forgotPassword, 
      resetPassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
