import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin'); // Rol predeterminado como admin
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    login(username, password, role);
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <h1>Prosmex</h1>
      <h2>Iniciar Sesión</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="gestor-cobranza">Gestor de Cobranza</option>
        <option value="titular">Titular</option>
        <option value="supervisor">Supervisor</option>
        <option value="gerente">Gerente</option>
        <option value="director">Director</option>
        <option value="admin">Admin</option>
      </select>
      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;
