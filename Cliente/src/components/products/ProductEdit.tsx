// components/ProductEdit.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findProductById, updateProducto, uploadImage } from '../../services/productos';
import { Producto } from '../../services/productos';

const ProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [name, setName] = useState<string>('');
  const [stock, setStock] = useState<number>(0);
  const [precioActual, setPrecioActual] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUri, setImageUri] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const product = await findProductById(parseInt(id!));
        setProducto(product);
        setName(product.name);
        setStock(product.stock);
        setPrecioActual(product.precioActual);
        setImageUri(product.imageUri || '');
      } catch (error) {
        alert('Error al obtener el producto');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
      let imageUrl = producto?.imageUri || '';

      // Subir la imagen primero, si se seleccionó una nueva imagen
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      // Actualizar el producto con la URL de la imagen subida
      await updateProducto(parseInt(id!), { name, stock, precioActual, imageUri: imageUrl });
      alert('Producto actualizado exitosamente');
      navigate('/products');
    } catch (error) {
      alert('Error al actualizar el producto');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Editar Producto</h1>
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
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
            required
            min={0}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precioActual">
            Precio Actual
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
            {loading ? 'Actualizando...' : 'Actualizar Producto'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;
