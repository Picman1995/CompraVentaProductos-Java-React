import axios from 'axios';
import config from '../config'; // Ajusta la ruta según la ubicación del archivo config.js
import { Venta, ReporteVentaDto, LineaVentaResponse } from './venta.d';

// Función para obtener todas las ventas
export const getVentas = async (): Promise<Venta[]> => {
  try {
    const response = await axios.get(`${config.API_URL}ventas/getVentas`);
    return response.data.results; // Usa 'results' en lugar de 'result'
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Ocurrió un error');
    } else {
      throw new Error('Ocurrió un error desconocido');
    }
  }
};

// Función para crear una nueva venta
export const createVenta = async (mapeoLineaVentas: Record<string, number>): Promise<Venta> => {
  try {
    const response = await axios.post(`${config.API_URL}ventas/createVenta`, mapeoLineaVentas);
    return response.data; // Ajustado para coincidir con la estructura esperada
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Ocurrió un error');
    } else {
      throw new Error('Ocurrió un error desconocido');
    }
  }
};

// Función para obtener el reporte de ganancias por semana
export const getGananciasByWeek = async (): Promise<ReporteVentaDto> => {
  try {
    const response = await axios.get(`${config.API_URL}ventas/getGananciasByWeek`);
    return response.data.results; // Usa 'results' en lugar de 'result'
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Ocurrió un error');
    } else {
      throw new Error('Ocurrió un error desconocido');
    }
  }
};

// Función para obtener las ventas por semana
export const getVentasByWeek = async (): Promise<Venta[]> => {
  try {
    const response = await axios.get(`${config.API_URL}ventas/getVentasByWeek`);
    return response.data.results; // Usa 'results' en lugar de 'result'
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Ocurrió un error');
    } else {
      throw new Error('Ocurrió un error desconocido');
    }
  }
};

// Función para obtener las ventas por mes
export const getVentasByMonth = async (mes?: number): Promise<Venta[]> => {
  try {
    const response = await axios.get(`${config.API_URL}ventas/getVentasByMonth`, { params: { mes } });
    return response.data.results; // Usa 'results' en lugar de 'result'
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Ocurrió un error');
    } else {
      throw new Error('Ocurrió un error desconocido');
    }
  }
};

// Función para obtener las ventas por año
export const getVentasByYear = async (): Promise<Venta[]> => {
  try {
    const response = await axios.get(`${config.API_URL}ventas/getVentasByYear`);
    return response.data.results; // Usa 'results' en lugar de 'result'
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Ocurrió un error');
    } else {
      throw new Error('Ocurrió un error desconocido');
    }
  }
};

// Función para obtener el reporte de ganancias por mes
export const getGananciasByMonth = async (mes?: number): Promise<ReporteVentaDto> => {
  try {
    const response = await axios.get(`${config.API_URL}ventas/getGananciasByMonth`, { params: { mes } });
    return response.data.results; // Usa 'results' en lugar de 'result'
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Ocurrió un error');
    } else {
      throw new Error('Ocurrió un error desconocido');
    }
  }
};

// Función para obtener el reporte de ganancias por año
export const getGananciasByYear = async (): Promise<ReporteVentaDto> => {
  try {
    const response = await axios.get(`${config.API_URL}ventas/getGananciasByYear`);
    return response.data.results; // Usa 'results' en lugar de 'result'
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Ocurrió un error');
    } else {
      throw new Error('Ocurrió un error desconocido');
    }
  }
};
