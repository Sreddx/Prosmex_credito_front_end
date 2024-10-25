import apiClient from '../../utils/apiClient';
import { Cliente, CreateClienteResponse, ErrorResponse } from '../../types';

// Listar todos los clientes
export const listClientes = async (): Promise<Cliente[] | ErrorResponse> => {
  try {
    const response = await apiClient.get<{ data: Cliente[] }>('/clientes/');
    console.log(response);
    return Array.isArray(response.data.data) ? response.data.data : []; // Asegúrate de devolver el array 'data'
  } catch (error: any) {
    return { error: error.response?.data?.message || 'Error fetching clients' };
  }
};

// Crear un nuevo cliente
export const createCliente = async (
  clienteData: Partial<Cliente>,
): Promise<CreateClienteResponse | ErrorResponse> => {
  try {
    const response = await apiClient.post<CreateClienteResponse>('/clientes/', clienteData);
    return response.data;
  } catch (error: any) {
    return { error: error.response?.data?.message || 'An error occurred' };
  }
};

// Obtener un cliente por ID
export const getCliente = async (clienteId: number): Promise<Cliente | ErrorResponse> => {
  try {
    const response = await apiClient.get<Cliente>(`/clientes/${clienteId}`);
    return response.data;
  } catch (error: any) {
    return { error: error.response?.data?.message || 'Cliente not found' };
  }
};

// Actualizar un cliente por ID
export const updateCliente = async (
  clienteId: number,
  clienteData: Partial<Cliente>,
): Promise<CreateClienteResponse | ErrorResponse> => {
  try {
    const response = await apiClient.put<CreateClienteResponse>(
      `/clientes/${clienteId}`,
      clienteData,
    );
    return response.data;
  } catch (error: any) {
    return { error: error.response?.data?.message || 'Cliente not found or failed to update' };
  }
};

// Eliminar un cliente por ID
export const deleteCliente = async (clienteId: number): Promise<ErrorResponse | undefined> => {
  try {
    const response = await apiClient.delete(`/clientes/${clienteId}`);
    return response.data;
  } catch (error: any) {
    return { error: error.response?.data?.message || 'Cliente not found' };
  }
};
