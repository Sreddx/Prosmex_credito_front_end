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

// Interfaces para los clientes
export interface Cliente {
  id: number; // ID único del cliente
  nombre: string; // Nombre del cliente
  apellido_paterno: string; // Apellido paterno del cliente
  apellido_materno: string; // Apellido materno del cliente
  colonia: string; // Colonia donde vive el cliente
  cp: string; // Código postal
  codigo_ine: string; // Código INE del cliente
  estado_civil: string; // Estado civil del cliente (soltero, casado, viudo, etc.)
  num_hijos: number; // Número de hijos del cliente
  propiedad: string; // Tipo de propiedad (casa propia, rentada, etc.)
  es_aval: boolean; // Indica si el cliente está usando aval
  grupo_id: number; // ID del grupo al que pertenece el cliente
}

// Otras interfaces...
export interface CreateClienteResponse {
  message: string;
  cliente: string; // ID del cliente creado
  status: number;
}

export interface ErrorResponse {
  error: string;
  status: number;
}

// Interfaces para Préstamos
export interface Prestamo {
  id: number;
  clienteId: number;
  monto: number;
}
