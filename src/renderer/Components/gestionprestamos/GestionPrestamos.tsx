import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Prestamo } from '../../types';
import './GestionPrestamos.css';

function GestionPrestamos() {
  const [clienteId, setClienteId] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [montoPrestamo, setMontoPrestamo] = useState(0);
  const [tipoPrestamoId, setTipoPrestamoId] = useState('');
  const [titularId, setTitularId] = useState('');
  const [avalId, setAvalId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoPrestamo: Prestamo = {
      clienteId,
      fechaInicio,
      montoPrestamo,
      tipoPrestamoId,
      titularId,
      avalId,
    };
    try {
      const response = await fetch('/api/prestamos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoPrestamo),
      });
      if (response.ok) {
        console.log('Préstamo creado:', nuevoPrestamo);
        navigate('/dashboard');
      } else {
        console.error('Error al crear el préstamo');
      }
    } catch (error) {
      console.error('Error al crear el préstamo:', error);
    }
  };

  return (
    <div className="gestion-prestamos-form-container">
      <form onSubmit={handleSubmit} className="gestion-prestamos-form">
        <h1>Crear Préstamo</h1>
        <input
          type="text"
          placeholder="ID Cliente"
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
          required
        />
        <label>
          Fecha de Inicio
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            required
          />
        </label>
        <label>
          Monto del Préstamo
          <input
            type="number"
            value={montoPrestamo}
            onChange={(e) => setMontoPrestamo(Number(e.target.value))}
            required
          />
        </label>
        <input
          type="text"
          placeholder="ID Tipo de Préstamo"
          value={tipoPrestamoId}
          onChange={(e) => setTipoPrestamoId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="ID Titular"
          value={titularId}
          onChange={(e) => setTitularId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="ID Aval"
          value={avalId}
          onChange={(e) => setAvalId(e.target.value)}
          required
        />
        <button type="submit">Crear Préstamo</button>
      </form>
      <button type="button" onClick={() => navigate('/dashboard')} className="back-button">
        Regresar al Dashboard
      </button>
    </div>
  );
}

export default GestionPrestamos;
