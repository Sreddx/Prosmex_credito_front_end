// Definición de tipos e interfaces

// Interfaces para la autenticación
export interface User {
  userId: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  usuario: string;
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

// Interfaz para Préstamo
export interface Prestamo {
  prestamo_id?: number; // ID del préstamo, opcional ya que no lo tendrás al crear un préstamo
  cliente_id: number; // ID del cliente
  fecha_inicio: string; // Fecha de inicio del préstamo
  monto_prestamo: number; // Monto del préstamo
  tipo_prestamo_id: number; // ID del tipo de préstamo
  aval_id: number; // ID del aval
}

export interface PrestamoConNombre {
  prestamo_id: number;
  cliente_id: number;
  cliente_nombre: string;
  fecha_inicio: string;
  monto_prestamo: string;
  aval_id: number;
  aval_nombre: string;
  tipo_prestamo_id: number;
  tipo_prestamo_nombre: string;
}
// Interfaz para Tipo de Préstamo
export interface TipoPrestamo {
  tipo_prestamo_id: number; // ID del tipo de préstamo
  nombre: string; // Nombre del tipo de préstamo (e.g., 'Préstamo Personal')
}

// Interfaz para Aval (clientes que son avales)
export interface Aval {
  id: number; // ID del aval (es un cliente que actúa como aval)
  nombre: string; // Nombre del aval
  grupo_id: number; // ID del grupo al que pertenece el aval
}

// Interfaz para la respuesta de creación de préstamo
export interface CreatePrestamoResponse {
  message: string; // Mensaje de éxito
  prestamo: number; // ID del préstamo creado
}
