// api.ts

import apiClient from '../../utils/apiClient'; // Adjust the path as necessary

// Interfaces
export interface Grupo {
  id: number;
  nombre: string;
}

export interface Prestamo {
  id: number;
  monto: number;
  cliente_nombrecompleto: string;
}

export interface Pago {
  fecha_pago: string;
  monto_pagado: number;
  prestamo_id: number;
}

export interface PagoResponse {
  pago: {
    id: number;
    fecha_pago: string;
    monto_pagado: number;
    prestamo_id: number;
  };
}

// API Functions

// Get list of grupos
export const getGrupos = async (): Promise<Grupo[]> => {
  try {
    const response = await apiClient.get('/pagos/grupos');
    return response.data.data.grupos;
  } catch (error) {
    console.error('Error fetching grupos:', error);
    throw error;
  }
};

// Get list of prestamos by grupo ID
export const getPrestamosByGrupo = async (grupo_id: number): Promise<Prestamo[]> => {
  try {
    const response = await apiClient.get('/pagos/prestamos', {
      params: { grupo_id },
    });
    return response.data.data.prestamos;
  } catch (error) {
    console.error('Error fetching prestamos:', error);
    throw error;
  }
};

// Create a new pago
export const createPago = async (pagoData: Pago): Promise<PagoResponse> => {
  try {
    const response = await apiClient.post('/pagos/', pagoData);
    return response.data.data;
  } catch (error) {
    console.error('Error creating pago:', error);
    throw error;
  }
};

// Get pagos by prestamo ID (if needed)
export const getPagosByPrestamo = async (prestamo_id: number): Promise<Pago[]> => {
  try {
    const response = await apiClient.get(`/pagos/pagos-prestamo/${prestamo_id}`);
    return response.data.data.pagos;
  } catch (error) {
    console.error('Error fetching pagos:', error);
    throw error;
  }
};

// Additional functions for grupos and prestamos if needed
export const listGrupos = async (): Promise<any[]> => {
  try {
    const response = await apiClient.get('/grupos/');
    return response.data;
  } catch (error) {
    console.error('Error fetching grupos:', error);
    throw error;
  }
};

export const listPrestamos = async (): Promise<any[]> => {
  try {
    const response = await apiClient.get('/prestamos/');
    return response.data;
  } catch (error) {
    console.error('Error fetching prestamos:', error);
    throw error;
  }
};
