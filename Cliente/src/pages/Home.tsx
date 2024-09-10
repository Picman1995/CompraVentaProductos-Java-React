import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaShoppingCart, FaDollarSign } from 'react-icons/fa';

const Home: React.FC = () => {
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    // Obtener el rol del usuario desde localStorage
    const userRole = localStorage.getItem('userRole');
    
    // Definir permisos basado en el rol
    switch (userRole) {
      case 'ADMIN':
        setPermissions([
          'crear_compra',
          'gestionar_productos',
          'crear_venta',
          'listar_compra'
        ]);
        break;
      case 'CLIENTE':
        setPermissions([
          'crear_venta'
        ]);
        break;
      case 'PROVEEDOR':
        setPermissions([
          'gestionar_productos'
        ]);
        break;
      default:
        setPermissions([]);
    }
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://img.freepik.com/foto-gratis/persona-comprando-mascarilla_23-2149565242.jpg?w=1380&t=st=1725473689~exp=1725474289~hmac=d7c394e70ab457c1fb34e1d3bd9e5152f8817f992846640b1983e4181bc68eb0)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(50%)'
        }}
      />
      <div className="relative z-10 flex flex-col items-center bg-white shadow-lg rounded-lg p-6 max-w-sm w-full mx-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Página Principal</h1>
        <p className="text-base text-gray-600 mb-6 text-center">
          Bienvenido a la aplicación de gestión de compras y productos. Selecciona una opción para comenzar.
        </p>
        <div className="grid grid-cols-1 gap-4 w-full">
          {permissions.includes('crear_compra') && (
            <Link
              to="/create-compra"
              className="flex items-center justify-between bg-red-100 p-3 rounded-lg shadow-md hover:bg-red-200 transition"
            >
              <div className="flex items-center">
                <FaShoppingCart className="text-red-500 text-2xl mr-3" />
                <span className="text-lg font-semibold text-red-700">Crear Compra</span>
              </div>
              <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Ir</button>
            </Link>
          )}
          {permissions.includes('gestionar_productos') && (
            <Link
              to="/create-product"
              className="flex items-center justify-between bg-purple-100 p-3 rounded-lg shadow-md hover:bg-purple-200 transition"
            >
              <div className="flex items-center">
                <FaBox className="text-purple-500 text-2xl mr-3" />
                <span className="text-lg font-semibold text-purple-700">Productos</span>
              </div>
              <button className="px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">Ir</button>
            </Link>
          )}
          {permissions.includes('crear_venta') && (
            <Link
              to="/create-venta"
              className="flex items-center justify-between bg-green-100 p-3 rounded-lg shadow-md hover:bg-green-200 transition"
            >
              <div className="flex items-center">
                <FaDollarSign className="text-green-500 text-2xl mr-3" />
                <span className="text-lg font-semibold text-green-700">Crear Venta</span>
              </div>
              <button className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Ir</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
