import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/profile'; // Ajusta la ruta según corresponda

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Llamar al servicio de logout
      await logout();

      // Limpiar el localStorage
      localStorage.removeItem('authToken'); // Solo eliminar el token

      // Redirigir al usuario a la página de inicio de sesión
      navigate('/login');
    } catch (error) {
      // Manejar el error si ocurre durante el cierre de sesión
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Llamar a handleLogout automáticamente cuando el componente se monta
  React.useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Cerrando sesión...</p>
    </div>
  );
};

export default LogoutPage;
