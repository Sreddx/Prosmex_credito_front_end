import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BajaUsuario.css';

function BajaUsuario() {
  const [usuarioId, setUsuarioId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/usuarios/${usuarioId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log('Usuario eliminado:', usuarioId);
        navigate('/dashboard');
      } else {
        console.error('Error al eliminar usuario');
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <div className="baja-usuario-container">
      <form onSubmit={handleSubmit} className="baja-usuario-form">
        <h1>Baja de Usuario</h1>
        <input
          type="text"
          placeholder="ID de Usuario"
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
          required
        />
        <button type="submit">Eliminar Usuario</button>
      </form>
      <button type="button" onClick={() => navigate('/dashboard')} className="back-button">
        Regresar al Dashboard
      </button>
    </div>
  );
}

export default BajaUsuario;
