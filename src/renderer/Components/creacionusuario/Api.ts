import apiClient from '../../utils/apiClient';

// Función para obtener los roles
export const fetchRoles = async () => {
  try {
    const response = await apiClient.get('/roles/all');
    return response.data;
  } catch (error) {
    console.error('Error al cargar los roles:', error);
    throw error;
  }
};

// Función para registrar un nuevo usuario
export const registerUser = async (nuevoUsuario: any) => {
  try {
    const response = await apiClient.post('/auth/register', nuevoUsuario);
    return response;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};
