// services/compra.ts
import axios from 'axios';
import config from '../config'; // Ajusta la ruta según la ubicación del archivo config.js
import { Compra, ReporteCompraDto, LineaCompraResponse } from './compra.d';

// Función para obtener todas las compras
export const getCompras = async (): Promise<Compra[]> => {
  try {
    const response = await axios.get(`${config.API_URL}compras/getCompras`);
    return response.data.results; // Usa 'results' en lugar de 'result'
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Ocurrió un error');
    } else {
      throw new Error('Ocurrió un error desconocido');
    }
  }
};

// Función para crear una nueva compra
export const createCompra = async (mapeoLineaCompras: Record<string, number>): Promise<Compra> => {
  try {
    const response = await axios.post(`${config.API_URL}compras/createCompra`, mapeoLineaCompras);
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
export const getGananciasByWeek = async (): Promise<ReporteCompraDto> => {
  try {
    const response = await axios.get(`${config.API_URL}compras/getGananciasByWeek`);
    return response.data.results; // Usa 'results' en lugar de 'result'
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Ocurrió un error');
    } else {
      throw new Error('Ocurrió un error desconocido');
    }
  }
};


