/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCompras } from '../../services/compra'; // Importa el servicio de compra
import { Compra } from '../../services/compra.d'; // Importa el tipo Compra

const CompraList: React.FC = () => {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCompras = async () => {
      setLoading(true);
      try {
        const data = await getCompras();
        setCompras(data);
      } catch (error) {
        alert('Error al cargar las compras');
      } finally {
        setLoading(false);
      }
    };

    fetchCompras();
  }, []);

  if (loading) return <div className="text-center">Cargando...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Lista de Compras</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-3 px-6 border-b text-left">ID Compra</th>
            <th className="py-3 px-6 border-b text-left">Fecha de Creación</th>
            <th className="py-3 px-6 border-b text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {compras.map((compra) => (
            <tr key={compra.idCompra} className="hover:bg-gray-100">
              <td className="py-3 px-6 border-b">{compra.idCompra}</td>
              <td className="py-3 px-6 border-b">{new Date(compra.fechaCreacion).toLocaleDateString()}</td>
              <td className="py-3 px-6 border-b">
                <Link to={`/linea-compra/${compra.idCompra}`}>
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

export default CompraList;
