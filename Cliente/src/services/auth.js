// services/authService.js
import axios from 'axios';
import config from '../config'; // Ajusta la ruta según la ubicación del archivo config.js

// Función para el login
export const login = async (username, password) => {
  try {
    // Realiza la solicitud POST al endpoint de autenticación
    const response = await axios.post(`${config.API_URL}auth/authenticate`, {
      username,
      password
    });
  
    // Devuelve los resultados; ajusta si el nombre es diferente
    return response.data.results; 
  } catch (error) {
    // Maneja el error lanzando una nueva excepción con el mensaje adecuado
    throw new Error(error.response?.data?.message || 'Ocurrió un error');
  }
};

// Función para registrar un nuevo usuario
export const register = async (name, email, password, roles = 'USER') => {
  try {
    // Realiza la solicitud POST al endpoint de creación de usuario
    const response = await axios.post(`${config.API_URL}auth/createUser`, {
      name,
      email,
      password,
      roles
    });
    // Devuelve los resultados; ajusta si el nombre es diferente
    return response.data.result;
  } catch (error) {
    // Maneja el error lanzando una nueva excepción con el mensaje adecuado
    throw new Error(error.response?.data?.message || 'Ocurrió un error');
  }
};
