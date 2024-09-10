import axios from 'axios';
import config from '../config'; // Ajusta la ruta según la ubicación del archivo config.js

// Función para obtener el perfil del usuario
export const getProfile = async () => {
  try {
    // Realiza la solicitud GET al endpoint de perfil
    const response = await axios.get(`${config.API_URL}usuario/profile`, {
      headers: {
        // Incluye el token de autenticación en los encabezados
        'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Asegúrate de que 'token' es el nombre correcto en el localStorage
      }
    });
    // Devuelve los datos del perfil del usuario
    return response.data.data; // Ajusta según el formato de tu respuesta
  } catch (error) {
    // Maneja el error lanzando una nueva excepción con el mensaje adecuado
    throw new Error(error.response?.data?.message || 'Ocurrió un error al obtener el perfil');
  }
};

// Función para cerrar sesión
export const logout = async () => {
  try {
    // Realiza la solicitud POST al endpoint de cierre de sesión
    const response = await axios.post(`${config.API_URL}usuario/logout`, {}, {
      headers: {
        // Incluye el token de autenticación en los encabezados
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    // Elimina el token de autenticación del almacenamiento local
    localStorage.removeItem('authToken');
    // Devuelve el mensaje de éxito
    return response.data; // Ajusta según el formato de tu respuesta
  } catch (error) {
    // Maneja el error lanzando una nueva excepción con el mensaje adecuado
    throw new Error(error.response?.data?.message || 'Ocurrió un error al cerrar sesión');
  }
};
