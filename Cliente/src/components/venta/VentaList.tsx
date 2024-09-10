import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getVentas } from '../../services/venta'; // Ajusta la ruta según sea necesario
import { Venta } from '../../services/venta.d'; // Ajusta la ruta según sea necesario

const VentaList: React.FC = () => {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchVentas = async () => {
      setLoading(true);
      try {
        const data = await getVentas();
        setVentas(data);
      } catch (error) {
        alert('Error al cargar las ventas');
      } finally {
        setLoading(false);
      }
    };

    fetchVentas();
  }, []);

  if (loading) return <div className="text-center">Cargando...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Lista de Ventas</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-3 px-6 border-b text-left">ID Venta</th>
            <th className="py-3 px-6 border-b text-left">Fecha de Creación</th>
            <th className="py-3 px-6 border-b text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.idVenta} className="hover:bg-gray-100">
              <td className="py-3 px-6 border-b">{venta.idVenta}</td>
              <td className="py-3 px-6 border-b">
                {venta.fechaCreacion ? new Date(venta.fechaCreacion).toLocaleDateString() : 'No disponible'}
              </td>
              <td className="py-3 px-6 border-b">
                <Link to={`/linea-venta/${venta.idVenta}`}>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Ver Detalle
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VentaList;
