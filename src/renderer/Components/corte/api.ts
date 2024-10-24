// api.ts para corte

import apiClient from '../../utils/apiClient'; // Ajusta la ruta según sea necesario

export interface Grupo {
  id: number;
  nombre: string;
}

// Función para obtener los grupos (mismo endpoint que en pagos)
export const getGrupos = async (): Promise<Grupo[]> => {
  try {
    const response = await apiClient.get('/pagos/grupos'); // Mismo endpoint que en pagos
    return response.data.data.grupos;
  } catch (error) {
    console.error('Error al obtener los grupos:', error);
    throw error;
  }
};
