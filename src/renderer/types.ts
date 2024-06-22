// Definición de tipos e interfaces

// Interfaces para la autenticación
export interface User {
  username: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export interface ProtectedRouteProps {
  children: JSX.Element;
  role?: string;
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
