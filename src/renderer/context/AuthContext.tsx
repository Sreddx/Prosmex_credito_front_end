import React, { createContext, useContext, useState, useMemo } from 'react';
import { AuthContextType, User, AuthProviderProps } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  function login(username: string, password: string) {
    if (username === 'admin' && password === 'password') {
      setUser({ username, role: 'admin' });
    } else if (username === 'user' && password === 'password') {
      setUser({ username, role: 'user' });
    }
  }

  function logout() {
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
