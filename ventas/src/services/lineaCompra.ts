// services/lineaCompra.ts
import axios from 'axios';
import config from '../config'; // Ajusta la ruta según la ubicación del archivo config.js
import { LineaCompraResponse } from './compra.d'; // Asegúrate de importar los tipos correctos

export const getLineaCompras = async (): Promise<LineaCompraResponse> => {
  try {
    const response = await axios.get(`${config.API_URL}Lineacompras/getLineaCompras`);
    return {
      lineasCompra: response.data.results, // Ajusta esto según cómo esté estructurada la respuesta
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Ocurrió un error');
    } else {
      throw new Error('Ocurrió un error desconocido');
    }
  }
};
