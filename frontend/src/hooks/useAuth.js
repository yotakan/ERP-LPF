// frontend/hooks/useAuth.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // โหลด user + token จาก localStorage เมื่อ component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // ฟังก์ชัน login: เก็บ token และ user
  const login = (newToken, userData) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  // ฟังก์ชัน logout: ลบ token และ user
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return {
    user,
    token,
    loading,
    login,
    logout,
  };
}
