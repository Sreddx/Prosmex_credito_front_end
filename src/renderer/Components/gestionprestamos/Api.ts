import apiClient from '../../utils/apiClient';
import { Prestamo, PrestamoConNombre, ErrorResponse } from '../../types';

// Crear un nuevo préstamo
export const createPrestamo = async (
  prestamoData: Partial<Prestamo>,
): Promise<{ message: string; prestamo: number } | ErrorResponse> => {
  try {
    const response = await apiClient.post<{ message: string; prestamo: number }>(
      '/prestamos/',
      prestamoData,
    );
    return response.data;
  } catch (error: any) {
    return { error: error.response?.data?.message || 'Error creating loan' };
  }
};

// Obtener lista de préstamos con paginación
export const listPrestamos = async (
  page = 1,
  per_page = 10,
): Promise<
  { prestamos: PrestamoConNombre[]; page: number; total_pages: number } | ErrorResponse
> => {
  try {
    const response = await apiClient.get<{
      data: {
        prestamos: PrestamoConNombre[];
        page: number;
        total_pages: number;
      };
    }>('/prestamos/', { params: { page, per_page } });

    return response.data.data; // Return the `data` field to get the nested structure directly
  } catch (error: any) {
    return { error: error.response?.data?.message || 'Error fetching loans' };
  }
};

// Obtener lista de tipos de préstamo
export const listTiposPrestamo = async (): Promise<
  { nombre: string; tipo_prestamo_id: number }[] | ErrorResponse
> => {
  try {
    const response = await apiClient.get<{ data: { nombre: string; tipo_prestamo_id: number }[] }>(
      '/prestamos/tipos',
    );
    return response.data.data;
  } catch (error: any) {
    return { error: error.response?.data?.message || 'Error fetching loan types' };
  }
};

// Obtener lista de clientes que son avales con paginación
export const listAvales = async (
  page = 1,
  per_page = 10,
): Promise<
  | { avales: { id: number; nombre: string; grupo_id: number }[]; total_pages: number }
  | ErrorResponse
> => {
  try {
    const response = await apiClient.get<{
      data: {
        avales: { id: number; nombre: string; grupo_id: number }[];
        total_pages: number;
      };
    }>('/clientes/avales', { params: { page, per_page } });
    return { avales: response.data.data.avales, total_pages: response.data.data.total_pages };
  } catch (error: any) {
    return { error: error.response?.data?.message || 'Error fetching guarantors' };
  }
};

// Obtener la lista de clientes para registrar préstamos con paginación
export const listClientesRegistroPrestamo = async (
  page = 1,
  per_page = 10,
): Promise<{ clientes: { id: number; nombre: string }[]; total_pages: number } | ErrorResponse> => {
  try {
    const response = await apiClient.get<{
      data: {
        clientes: { id: number; nombre: string }[];
        total_pages: number;
      };
    }>('/clientes/clientes-registro-prestamo', { params: { page, per_page } });
    return { clientes: response.data.data.clientes, total_pages: response.data.data.total_pages };
  } catch (error: any) {
    return {
      error: error.response?.data?.message || 'Error fetching clients for loan registration',
    };
  }
};
