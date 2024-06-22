import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ProtectedRouteProps } from '../types';

function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default ProtectedRoute;
