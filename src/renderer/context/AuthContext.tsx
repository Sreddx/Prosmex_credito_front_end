import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { AuthContextType, User, AuthProviderProps } from '../types';
import { loginApi } from '../Components/login/Api';
import { setAuthToken } from '../utils/apiClient';

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const rolePermissions: { [key: number]: number[] } = {
  1: [3, 4], // Example permissions for different roles
  2: [1, 2, 3, 4],
  3: [1, 2, 3, 4, 5, 6],
  4: [1, 2, 3, 4, 5, 6],
  5: [1, 2, 3, 4, 5, 6, 7],
  6: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const response = await loginApi(username, password);

      if ('error' in response) {
        console.error(response.error);
        return;
      }

      const { User: userData, message } = response.data;
      const permissions = rolePermissions[userData.rol_id] || [];

      setUser({ ...userData, permissions });

      setToken(response.data.access_token); // Assuming access_token is provided in another part of the response
      setAuthToken(response.data.access_token); // Set token in API client
      localStorage.setItem('token', response.data.access_token || ''); // Store the token

      if (process.env.NODE_ENV !== 'production') {
        console.log(message); // Log success message, if needed
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setAuthToken(null); // Remove token from API client
    localStorage.removeItem('token'); // Clear the token
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
    }),
    [user, token, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
