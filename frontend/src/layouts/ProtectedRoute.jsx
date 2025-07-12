import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function ProtectedRoute({ children }) {
  const { token } = useAuth();

  if (!token) {
    // ถ้าไม่มี token ให้ redirect ไปหน้า login
    return <Navigate to="/" replace />;
  }

  // ถ้ามี token แสดงหน้าลูก
  return children;
}

export default ProtectedRoute;
