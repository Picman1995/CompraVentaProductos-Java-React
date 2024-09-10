import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth';
import './index.css'; // Asegúrate de que el archivo CSS esté en el mismo directorio

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { token, rol, name } = await login(username, password);
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', rol);
      localStorage.setItem('username', name);
      navigate('/home');
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      if (err instanceof Error) {
        setError('Error de autenticación: ' + err.message);
      } else {
        setError('Ocurrió un error desconocido');
      }
    }
  };

  return (
    <div className="login-form-container">
      <div className="wrapper_login">
        <div className="logo_login"></div>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Acceso</h2>
        <form onSubmit={handleLogin}>
          <div className="input-box">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="username">Usuario</label>
          </div>
          <div className="input-box">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Contraseña</label>
          </div>
          <button
            type="submit"
            className="my-btn"
          >
            Acceder
          </button>
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </form>
        <div className="register-link text-center">
          <p>
            ¿No tienes una cuenta? <a href="/register">Crea una cuenta</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
