import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BajaPrestamo.css';

function BajaPrestamo() {
  const [prestamoId, setPrestamoId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/prestamos/${prestamoId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log('Préstamo eliminado:', prestamoId);
        navigate('/dashboard');
      } else {
        console.error('Error al eliminar préstamo');
      }
    } catch (error) {
      console.error('Error al eliminar préstamo:', error);
    }
  };

  return (
    <div className="baja-prestamo-container">
      <form onSubmit={handleSubmit} className="baja-prestamo-form">
        <h1>Baja de Préstamo</h1>
        <input
          type="text"
          placeholder="ID de Préstamo"
          value={prestamoId}
          onChange={(e) => setPrestamoId(e.target.value)}
          required
        />
        <button type="submit">Eliminar Préstamo</button>
      </form>
      <button type="button" onClick={() => navigate('/dashboard')} className="back-button">
        Regresar al Dashboard
      </button>
    </div>
  );
}

export default BajaPrestamo;
