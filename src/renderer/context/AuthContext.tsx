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

const rolePermissions: { [key: string]: number[] } = {
  'gestor-cobranza': [3, 4],
  titular: [1, 2, 3, 4],
  supervisor: [1, 2, 3, 4, 5, 6],
  gerente: [1, 2, 3, 4, 5, 6],
  director: [1, 2, 3, 4, 5, 6, 7],
  admin: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  function login(username: string, password: string, role: string) {
    // Simulación de inicio de sesión con rol especificado
    const permissions = rolePermissions[role];
    if (permissions) {
      setUser({ username, role, permissions });
    } else {
      console.error('Rol no válido');
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
