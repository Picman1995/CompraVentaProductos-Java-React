import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/auth';
import './index.css'; // Asegúrate de que el archivo CSS esté en el mismo directorio

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await register(username, email, password);
      navigate('/login');
    } catch (err) {
      if (err instanceof Error) {
        setError('Error al registrar: ' + err.message);
      } else {
        setError('Ocurrió un error desconocido');
      }
    }
  };

  return (
    <div className="register-form-container">
      <div className="wrapper_register">
        <div className="logo_register"></div>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Registro</h2>
        <form onSubmit={handleRegister}>
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
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Gmail</label>
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
            className="register-btn"
          >
            Registrarse
          </button>
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </form>
        <div className="register-link text-center">
          <p>
            ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
