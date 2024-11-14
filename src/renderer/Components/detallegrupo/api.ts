// api.ts
import { Prestamo } from 'src/renderer/types';
import apiClient from '../../utils/apiClient';

export interface PrestamoData {
  prestamos: Prestamo[];
  page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
}

// Función para obtener los préstamos por grupo con paginación
export const getPrestamosByGrupo = async (
  grupo_id: number,
  page = 1,
  per_page = 10,
): Promise<PrestamoData> => {
  try {
    const response = await apiClient.get(`/pagos/prestamos`, {
      params: { grupo_id, page, per_page },
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Error al obtener los préstamos del grupo');
  }
};

// Función para agregar un nuevo pago (sin cambios)
export const addPago = async (pagoData: { monto_pagado: number; prestamo_id: number }) => {
  try {
    const response = await apiClient.post('/pagos/', pagoData);
    return response.data;
  } catch (error) {
    throw new Error('Error al agregar el pago');
  }
};
