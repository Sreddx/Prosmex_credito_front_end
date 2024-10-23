import apiClient from '../../utils/apiClient';

// Función para obtener los préstamos por grupo
export const getPrestamosByGrupo = async (grupo_id: number) => {
  try {
    const response = await apiClient.get(`/pagos/prestamos`, {
      params: { grupo_id },
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Error al obtener los préstamos del grupo');
  }
};
