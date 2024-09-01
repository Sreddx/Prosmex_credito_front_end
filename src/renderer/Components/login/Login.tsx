import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      console.log('Attempting to log in...');
      await login(username, password);
      console.log('Login successful, navigating to dashboard...');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Failed to log in');
    }
  };

  return (
    <div className="login-container">
      <h1>Prosmex</h1>
      <h2>Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Correo"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;
