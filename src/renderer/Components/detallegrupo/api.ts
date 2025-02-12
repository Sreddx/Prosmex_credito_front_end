// api.ts
import { Prestamo, PrestamoRenovacion } from 'src/renderer/types';
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

// Función para obtener prestamo especifico
export const getPrestamoById = async (prestamo_id: number): Promise<PrestamoRenovacion> => {
  try {
    const response = await apiClient.get(`/prestamos/${prestamo_id}`);
    const { data } = response.data;

    // Convert fields as needed:
    const prestamoRenovacion: PrestamoRenovacion = {
      prestamo_id: data.prestamo_id,
      cliente_id: data.cliente_id,
      // Convert the date string into the format you want (YYYY-MM-DD)
      fecha_inicio: new Date(data.fecha_inicio).toISOString().split('T')[0],
      // Ensure numeric values are numbers
      monto_prestamo: Number(data.monto_prestamo),
      tipo_prestamo_id: data.tipo_prestamo_id,
      aval_id: data.aval_id,
    };

    return prestamoRenovacion;
  } catch (error) {
    throw new Error('Error al obtener el préstamo');
  }
};

// Función para agregar nuevos pagos (actualizada)
export const addPago = async (pagoData: { monto_pagado: number; prestamo_id: number }[]) => {
  try {
    console.log(pagoData);
    const response = await apiClient.post('/pagos/', pagoData); // Enviar como array
    return response.data;
  } catch (error) {
    throw new Error('Error al agregar los pagos');
  }
};
