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

// Función para agregar un nuevo pago
export const addPago = async (pagoData: { monto_pagado: number; prestamo_id: number }) => {
  try {
    const response = await apiClient.post('/pagos/', pagoData); // Usamos el endpoint raíz para crear el pago
    return response.data;
  } catch (error) {
    throw new Error('Error al agregar el pago');
  }
};
