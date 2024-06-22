import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleLogin() {
    login(username, password);
    navigate('/dashboard');
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;
