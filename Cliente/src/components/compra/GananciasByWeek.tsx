import React, { useState, useEffect } from 'react';
import { getGananciasByWeek } from '../../services/compra'; // Importa el servicio de ganancias por semana
import { ReporteCompraDto, Compra } from '../../services/compra.d'; // Importa los tipos necesarios

const GananciasByWeek: React.FC = () => {
  const [reporte, setReporte] = useState<ReporteCompraDto | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchGanancias = async () => {
      setLoading(true);
      try {
        const data = await getGananciasByWeek();
        setReporte(data);
      } catch (error) {
        alert('Error al cargar las ganancias');
      } finally {
        setLoading(false);
      }
    };

    fetchGanancias();
  }, []);

  if (loading) return <div className="text-center">Cargando...</div>;

  if (!reporte) return <div className="text-center">No hay datos disponibles</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Gasto por Semana</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-3 px-4 border-b text-left">ID Compra</th>
            <th className="py-3 px-4 border-b text-left">Fecha de Creación</th>
            <th className="py-3 px-4 border-b text-left">Cantidad</th>
            <th className="py-3 px-4 border-b text-left">Compra Total</th>
          </tr>
        </thead>
        <tbody>
          {reporte.compras.map((compra: Compra) => (
            <tr key={compra.idCompra} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-left">{compra.idCompra}</td>
              <td className="py-2 px-4 border-b text-left">{new Date(compra.fechaCreacion).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b text-left">{reporte.cantidad}</td>
              <td className="py-2 px-4 border-b text-left">{reporte.gastoTotal ? `Gs ${reporte.gastoTotal.toFixed(2)}` : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GananciasByWeek;
