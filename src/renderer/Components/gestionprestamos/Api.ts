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

// Obtener lista de préstamos
export const listPrestamos = async (): Promise<{ data: PrestamoConNombre[] } | ErrorResponse> => {
  try {
    const response = await apiClient.get<{ data: PrestamoConNombre[] }>('/prestamos/');
    return response.data; // Devolvemos solo el campo 'data'
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

// Obtener lista de clientes que son avales
export const listAvales = async (): Promise<
  { id: number; nombre: string; grupo_id: number }[] | ErrorResponse
> => {
  try {
    const response = await apiClient.get<{
      data: { id: number; nombre: string; grupo_id: number }[];
    }>('/clientes/avales');
    return response.data.data;
  } catch (error: any) {
    return { error: error.response?.data?.message || 'Error fetching guarantors' };
  }
};

// Obtener la lista de clientes para registrar préstamos
export const listClientesRegistroPrestamo = async (): Promise<
  { id: number; nombre: string }[] | ErrorResponse
> => {
  try {
    const response = await apiClient.get<{ data: { id: number; nombre: string }[] }>(
      '/clientes/clientes-registro-prestamo',
    );
    return response.data.data; // Retorna la lista de clientes
  } catch (error: any) {
    return {
      error: error.response?.data?.message || 'Error fetching clients for loan registration',
    };
  }
};
