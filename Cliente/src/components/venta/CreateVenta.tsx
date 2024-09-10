import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductos } from '../../services/productos';
import { createVenta } from '../../services/venta';
import { Producto } from '../../services/productos';

interface LineaVenta {
  productoNombre: string; // Cambiar productoId a productoNombre
  cantidad: number;
  precioUnitario: number;
}

const CreateVenta: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [lineas, setLineas] = useState<LineaVenta[]>([{ productoNombre: '', cantidad: 1, precioUnitario: 0 }]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      const data = await getProductos();
      setProductos(data);
    };

    fetchProductos();
  }, []);

  const handleLineaChange = (index: number, field: 'productoNombre' | 'cantidad', value: string | number) => {
    const updatedLineas = [...lineas];
    updatedLineas[index] = {
      ...updatedLineas[index],
      [field]: value,
    };

    // Actualizar el precio unitario automáticamente al seleccionar el producto
    if (field === 'productoNombre') {
      const selectedProducto = productos.find(producto => producto.name === value);
      if (selectedProducto) {
        updatedLineas[index].precioUnitario = selectedProducto.precioActual;
      }
    }

    // Actualizar el precio total según la cantidad
    if (field === 'cantidad') {
      const selectedProducto = productos.find(producto => producto.name === updatedLineas[index].productoNombre);
      if (selectedProducto) {
        updatedLineas[index].precioUnitario = selectedProducto.precioActual * Number(value);
      }
    }

    setLineas(updatedLineas);
  };

  const handleAddLinea = () => {
    setLineas([...lineas, { productoNombre: '', cantidad: 1, precioUnitario: 0 }]);
  };

  const handleRemoveLinea = (index: number) => {
    setLineas(lineas.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Mapeo de líneas de venta enviando nombres de productos
      const mapeoLineaVentas: Record<string, number> = lineas.reduce((acc, linea) => {
        if (linea.productoNombre && linea.cantidad > 0) {
          acc[linea.productoNombre] = linea.cantidad;
        }
        return acc;
      }, {} as Record<string, number>);

      if (Object.keys(mapeoLineaVentas).length === 0) {
        alert('No se ha agregado ninguna línea de venta');
        return;
      }

      await createVenta(mapeoLineaVentas);
      alert('Venta creada con éxito');
      navigate('/ventas');
    } catch (error) {
      alert('Error al crear la venta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Crear Venta</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        {lineas.map((linea, index) => (
          <div key={index} className="mb-4 flex items-center space-x-4">
            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`producto-${index}`}>
                Seleccionar Producto
              </label>
              <select
                id={`producto-${index}`}
                value={linea.productoNombre}
                onChange={(e) => handleLineaChange(index, 'productoNombre', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Seleccione un producto</option>
                {productos.map((producto) => (
                  <option key={producto.idProducto} value={producto.name}>
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
            onClick={() => navigate('/ventas')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Listar Ventas
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? 'Guardando...' : 'Guardar Venta'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateVenta;
