// Definición de tipos e interfaces

// Interfaces para la autenticación
export interface User {
  userId: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;
  rol: string;
  rol_id: number;
  permissions: number[];
}
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
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
