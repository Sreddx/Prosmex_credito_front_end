import apiClient from '../../utils/apiClient';

// Función para obtener los pagos por prestamo_id
export const getPagosByPrestamo = async (prestamo_id: number) => {
  try {
    const response = await apiClient.get(`pagos/pagos-prestamo/${prestamo_id}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Error al obtener los pagos del préstamo');
  }
};

// Función para agregar nuevos pagos (actualizada)
export const addPago = async (pagoData: { monto_pagado: number; prestamo_id: number }[]) => {
  try {
    const response = await apiClient.post('/pagos/', pagoData); // Enviar como array
    return response.data;
  } catch (error) {
    throw new Error('Error al agregar los pagos');
  }
};
