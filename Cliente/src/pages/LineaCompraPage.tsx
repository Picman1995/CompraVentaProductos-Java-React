import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import { getLineaCompras } from '../services/lineaCompra';
import { LineaCompra } from '../services/compra.d';

const LineaCompraPage: React.FC = () => {
  const { idCompra } = useParams<{ idCompra: string }>();
  const [lineas, setLineas] = useState<LineaCompra[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchLineas = async () => {
      if (idCompra) { // Revisa si necesitas esta verificación
        setLoading(true);
        try {
          const response = await getLineaCompras();
          console.log(response); // Revisa la estructura de la respuesta
          setLineas(response.lineasCompra);
        } catch (error) {
          console.error('Error al cargar las líneas de compra:', error);
          alert('Error al cargar las líneas de compra');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLineas();
  }, [idCompra]);

  if (loading) return <div className="text-center">Cargando...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Líneas de Compra</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-3 px-6 border-b text-left">ID Producto</th>
            <th className="py-3 px-6 border-b text-left">Nombre Producto</th>
            <th className="py-3 px-6 border-b text-left">Cantidad</th>
            <th className="py-3 px-6 border-b text-left">Precio Unitario</th>
          </tr>
        </thead>
        <tbody>
          {lineas.map((linea) => (
            <tr key={linea.nroLinea} className="hover:bg-gray-100">
              <td className="py-3 px-6 border-b">{linea.producto.idProducto}</td>
              <td className="py-3 px-6 border-b">{linea.producto.name}</td>
              <td className="py-3 px-6 border-b">{linea.cantidad}</td>
              <td className="py-3 px-6 border-b">{linea.precioUnitario}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <Link to="/ganancias-by-week">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Ver Compras por Semana</button>
        </Link>
      </div>
    </div>
  );
};

export default LineaCompraPage;
