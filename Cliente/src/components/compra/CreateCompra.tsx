import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductos } from '../../services/productos';
import { createCompra } from '../../services/compra';
import { Producto } from '../../services/productos.d';

interface LineaCompra {
  productoId: string;
  cantidad: number;
  precioUnitario: number;
}

const CreateCompra: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [lineas, setLineas] = useState<LineaCompra[]>([{ productoId: '', cantidad: 1, precioUnitario: 0 }]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      const data = await getProductos();
      setProductos(data);
    };

    fetchProductos();
  }, []);

  const handleLineaChange = (index: number, field: 'productoId' | 'cantidad', value: string | number) => {
    const updatedLineas = [...lineas];
    updatedLineas[index] = {
      ...updatedLineas[index],
      [field]: value,
    };

    // Actualizar el precio unitario automáticamente al seleccionar el producto
    if (field === 'productoId') {
      const selectedProducto = productos.find(producto => producto.idProducto === Number(value));
      if (selectedProducto) {
        updatedLineas[index].precioUnitario = selectedProducto.precioActual;
      }
    }

    // Actualizar el precio total según la cantidad
    if (field === 'cantidad') {
      const selectedProducto = productos.find(producto => producto.idProducto === Number(updatedLineas[index].productoId));
      if (selectedProducto) {
        updatedLineas[index].precioUnitario = selectedProducto.precioActual * Number(value);
      }
    }

    setLineas(updatedLineas);
  };

  const handleAddLinea = () => {
    setLineas([...lineas, { productoId: '', cantidad: 1, precioUnitario: 0 }]);
  };

  const handleRemoveLinea = (index: number) => {
    setLineas(lineas.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Construir el objeto en el formato correcto
      const mapeoLineaCompras: Record<string, number> = lineas.reduce((acc, linea) => {
        if (linea.productoId && linea.cantidad > 0) {
          acc[linea.productoId] = linea.cantidad;
        }
        return acc;
      }, {} as Record<string, number>);
  
      if (Object.keys(mapeoLineaCompras).length === 0) {
        alert('No se ha agregado ninguna línea de compra');
        return;
      }
  
      await createCompra(mapeoLineaCompras);
      alert('Compra creada con éxito');
      navigate('/compra-list');
    } catch (error) {
      alert('Error al crear la compra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Crear Compra</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        {lineas.map((linea, index) => (
          <div key={index} className="mb-4 flex items-center space-x-4">
            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`producto-${index}`}>
                Seleccionar Producto
              </label>
              <select
                id={`producto-${index}`}
                value={linea.productoId}
                onChange={(e) => handleLineaChange(index, 'productoId', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Seleccione un producto</option>
                {productos.map((producto) => (
                  <option key={producto.idProducto} value={producto.idProducto}>
                    {producto.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`cantidad-${index}`}>
                Cantidad
              </label>
              <input
                id={`cantidad-${index}`}
                type="number"
                value={linea.cantidad}
                onChange={(e) => handleLineaChange(index, 'cantidad', Number(e.target.value))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                min={1}
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`precio-unitario-${index}`}>
                Precio Total
              </label>
              <input
                id={`precio-unitario-${index}`}
                type="number"
                value={linea.precioUnitario}
                readOnly
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemoveLinea(index)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Eliminar
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddLinea}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Agregar Línea
        </button>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/compra-list')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Lista de compras
          </button>
          <button
            type="submit"
            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Creando...' : 'Crear Compra'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCompra;
