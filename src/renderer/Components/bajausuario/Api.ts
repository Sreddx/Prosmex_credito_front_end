import apiClient from '../../utils/apiClient';
import { User, ErrorResponse } from '../../types';

// Obtener lista de usuarios
export const getUsuarios = async (): Promise<User[] | ErrorResponse> => {
  try {
    const response = await apiClient.get<User[]>('/users/');
    return Array.isArray(response.data) ? response.data : []; // Asegurarse de devolver un array
  } catch (error: any) {
    return { error: error.response?.data?.message || 'Error fetching users' };
  }
};

// Eliminar un usuario por ID
export const deleteUsuario = async (userId: number): Promise<ErrorResponse | undefined> => {
  try {
    await apiClient.delete(`/users/${userId}`);
  } catch (error: any) {
    return { error: error.response?.data?.message || 'Error deleting user' };
  }
};
