// components/ProductList.tsx
import React, { useState, useEffect } from 'react';
import { getProductos, deleteProducto } from '../../services/productos';
import { Producto } from '../../services/productos';
import { Link } from 'react-router-dom';

const ProductList: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      try {
        const response = await getProductos();
        setProductos(response);
      } catch (error) {
        alert('Error al obtener la lista de productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const filteredProducts = productos.filter(producto =>
        producto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.idProducto?.toString().includes(searchTerm)
      );
      setProductos(filteredProducts);
    } catch (error) {
      alert('Error al buscar productos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      setLoading(true);
      try {
        await deleteProducto(id);
        setProductos(productos.filter(producto => producto.idProducto !== id));
        alert('Producto eliminado exitosamente');
      } catch (error) {
        alert('Error al eliminar el producto');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Lista de Productos</h1>
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre o ID"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Buscar
        </button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Nombre</th>
              <th className="px-4 py-2 border-b">Stock</th>
              <th className="px-4 py-2 border-b">Precio Unitario</th>
              <th className="px-4 py-2 border-b">Imagen</th>
              <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.idProducto}>
                <td className="px-4 py-2 border-b text-center">{producto.idProducto}</td>
                <td className="px-4 py-2 border-b text-center">{producto.name}</td>
                <td className="px-4 py-2 border-b text-center">{producto.stock}</td>
                <td className="px-4 py-2 border-b text-center">{producto.precioActual}</td>
                <td className="px-4 py-2 border-b text-center">
                  {producto.imageUri && <img src={producto.imageUri} alt={producto.name} className="w-16 h-16 mx-auto" />}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <Link
                    to={`/edit-products/${producto.idProducto}`}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(producto.idProducto!)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
