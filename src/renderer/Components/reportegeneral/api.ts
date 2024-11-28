// api.ts

import apiClient from '../../utils/apiClient';

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
  numero_de_prestamos: number;
  morosidad_monto: number;
  morosidad_porcentaje: number;
  porcentaje_prestamo: number | null;
  sobrante: number;
  bono: number;
}

export interface TotalesData {
  morosidad_monto: number | undefined;
  total_prestamos_activos: number;
  total_cobranza_ideal: number;
  total_cobranza_real: number;
  total_prestamo_real: number;
  total_prestamo_papel: number;
  total_numero_de_creditos: number;
  total_bono: number;
}

// Obtener el reporte general paginado
export const getReporteGeneral = async (
  page = 1,
  per_page = 10,
): Promise<{ reporte: ReporteData[]; page: number; per_page: number; total_items: number }> => {
  try {
    const response = await apiClient.get('/reporte/general', { params: { page, per_page } });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching reporte general:', error);
    throw error;
  }
};

// Obtener los totales del reporte
export const getTotales = async (): Promise<TotalesData> => {
  try {
    const response = await apiClient.get('/reporte/general/totales');
    return response.data.data.totales;
  } catch (error) {
    console.error('Error fetching totales:', error);
    throw error;
  }
};
