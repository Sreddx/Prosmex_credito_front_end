import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions: number[];
}

function ProtectedRoute({ children, requiredPermissions }: ProtectedRouteProps) {
  const { user, token } = useAuth();
  console.log('User:', user);

  if (!user || !token) {
    // Redirect to login if not authenticated
    return <Navigate to="/" />;
  }

  // If no specific permissions are required, allow access
  if (requiredPermissions.length === 0) {
    return <>{children}</>;
  }

  // Check if the user has ALL the required permissions
  const hasPermission = requiredPermissions.every((permission) =>
    user.permissions.includes(permission),
  );

  if (!hasPermission) {
    // Redirect to the Not Authorized page if the user lacks the necessary permissions
    return <div>Not Authorized</div>;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
