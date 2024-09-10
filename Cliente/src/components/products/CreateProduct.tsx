import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { createProducto, uploadImage } from '../../services/productos';

const CreateProduct: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [stock, setStock] = useState<number>(0); // Stock inicializado en 0
  const [precioActual, setPrecioActual] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUri, setImageUri] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate(); // Usa useNavigate para la redirección

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setImageUri(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';

      // Subir la imagen primero, si se seleccionó una imagen
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      // Crear el producto con la URL de la imagen subida
      await createProducto({ name, stock, precioActual, imageUri: imageUrl });
      alert('Producto creado exitosamente');

      // Limpiar los campos del formulario
      setName('');
      setStock(0);
      setPrecioActual(0);
      setImageFile(null);
      setImageUri('');

      // Redirigir a la lista de productos
      navigate('/products');
    } catch (error) {
      alert('Error al crear el producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Crear Nuevo Producto</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nombre del Producto
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
            required
            maxLength={20}
          />
        </div>
        {/* Campo de stock oculto o de solo lectura */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            value={stock}
            readOnly
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 bg-gray-200 leading-tight cursor-not-allowed"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precioActual">
            Precio Unitario
          </label>
          <input
            type="number"
            id="precioActual"
            value={precioActual}
            onChange={(e) => setPrecioActual(parseFloat(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
            required
            min={0}
            max={999999999}
            step="0.01"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Imagen del Producto
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
          />
          {imageUri && <img src={imageUri} alt="Vista previa" className="mt-4" />}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Creando...' : 'Crear Producto'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/products')} // Redirige a la lista de productos
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4"
          >
           Listar productos
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
