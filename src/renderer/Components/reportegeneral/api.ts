// api.ts

import apiClient from '../../utils/apiClient'; // Adjust the path accordingly

// Existing imports and interfaces...

export interface ReporteData {
  gerente: string;
  supervisor: string;
  titular: string;
  ruta: string;
  grupo: string;
  cobranza_ideal: number;
  cobranza_real: number;
  prestamo_papel: number;
  prestamo_real: number;
  numero_de_creditos: number;
  morosidad_monto: number;
  morosidad_porcentaje: number;
  porcentaje_prestamo: number | null;
  sobrante: number;
}

export const getReporteGeneral = async (): Promise<ReporteData[]> => {
  try {
    const response = await apiClient.get('/reporte/general');
    return response.data.data.reporte; // Adjust if your response structure is different
  } catch (error) {
    console.error('Error fetching reporte general:', error);
    throw error;
  }
};

// ... other API functions ...
