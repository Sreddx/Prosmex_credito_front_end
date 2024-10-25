// api.ts para corte

import apiClient from '../../utils/apiClient'; // Ajusta la ruta según sea necesario

export interface Grupo {
  id: number;
  nombre: string;
}

export interface CorteData {
  corte_total: number;
  total_gastos: number;
  semilla: number;
}

export const getGrupos = async (): Promise<Grupo[]> => {
  try {
    const response = await apiClient.get('/pagos/grupos');
    return response.data.data.grupos;
  } catch (error) {
    console.error('Error al obtener los grupos:', error);
    throw error;
  }
};

// Obtener datos de corte
export const getDatosCorte = async (): Promise<{ sobrante_total: number; bono_global: number }> => {
  try {
    const response = await apiClient.get('/cortes/datos-corte');
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos de corte:', error);
    throw error;
  }
};

// Crear un nuevo corte en /cortes/cortes
export const createCorte = async (data: CorteData): Promise<void> => {
  try {
    await apiClient.post('/cortes/cortes', data);
  } catch (error) {
    console.error('Error al crear el corte:', error);
    throw error;
  }
};
