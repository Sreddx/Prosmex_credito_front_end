import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ProtectedRouteProps } from '../types';

function ProtectedRoute({ children, requiredPermissions }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  const hasPermission = requiredPermissions.every((permission) =>
    user.permissions.includes(permission),
  );

  if (!hasPermission) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default ProtectedRoute;
