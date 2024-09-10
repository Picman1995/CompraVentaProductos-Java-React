import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from './Footer';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white p-4">
        <nav className="flex justify-between items-center">
          <div>
            <Link to="/home" className="text-white font-bold text-lg flex items-center">
              <FaHome className="mr-2" />
              Inicio
            </Link>
          </div>
          <div>
            <Link to="/logout" className="text-white mx-2 flex items-center">
              <FaSignOutAlt className="mr-2" />
              Cerrar Sesión
            </Link>
          </div>
        </nav>
      </header>
      
      <main className="flex-grow p-6 bg-gray-100">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
