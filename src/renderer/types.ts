// Definición de tipos e interfaces

// Interfaces para la autenticación
export interface User {
  username: string;
  role: string;
  permissions: number[]; // Permisos del usuario
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role: string) => void;
  logout: () => void;
}

export interface ProtectedRouteProps {
  children: JSX.Element;
  requiredPermissions: number[]; // Permisos requeridos para la ruta
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

// Interfaces para Clientes
export interface Cliente {
  id?: number;
  nombre: string;
  direccion: string;
  telefono: string;
}

// Interfaces para Préstamos
export interface Prestamo {
  id: number;
  clienteId: number;
  monto: number;
}
