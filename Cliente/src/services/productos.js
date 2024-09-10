// services/productos.js
import axios from 'axios';
import config from '../config'; // Ajusta la ruta según la ubicación del archivo config.js

// Función para subir una imagen y obtener la URL
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${config.API_URL}productos/uploadImage`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Aquí recibirás la URL de la imagen
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ocurrió un error al subir la imagen');
  }
};

// Función para obtener todos los productos
export const getProductos = async () => {
  try {
    const response = await axios.get(`${config.API_URL}productos/getProductos`);
    return response.data.results; // Usa 'results' en lugar de 'result'
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ocurrió un error');
  }
};

// Función para crear un nuevo producto
export const createProducto = async (producto) => {
  try {
    const response = await axios.post(`${config.API_URL}productos/createProducto`, producto);
    return response.data.results; // Usa 'results' en lugar de 'result'
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ocurrió un error');
  }
};

// Función para actualizar un producto existente
export const updateProducto = async (id_producto, producto) => {
  try {
    const response = await axios.put(`${config.API_URL}productos/updateProducto/${id_producto}`, producto);
    return response.data.results; // Usa 'results' en lugar de 'result'
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ocurrió un error');
  }
};

// Función para eliminar un producto
export const deleteProducto = async (id_producto) => {
  try {
    const response = await axios.delete(`${config.API_URL}productos/deleteProducto/${id_producto}`);
    return response.data.results; // Usa 'results' en lugar de 'result'
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ocurrió un error');
  }
};

// Función para buscar un producto por ID
export const findProductById = async (id_producto) => {
  try {
    const response = await axios.get(`${config.API_URL}productos/buscarProductoId/${id_producto}`);
    return response.data.results; // Usa 'results' en lugar de 'result'
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ocurrió un error');
  }
};

// Función para buscar un producto por nombre
export const findProductByName = async (nombreProducto) => {
  try {
    const response = await axios.get(`${config.API_URL}productos/buscarProductoNombre/${nombreProducto}`);
    return response.data.results; // Usa 'results' en lugar de 'result'
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ocurrió un error');
  }
};
