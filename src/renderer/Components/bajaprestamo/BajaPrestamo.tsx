import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../utils/apiClient';
import './BajaPrestamo.css';

function BajaPrestamo() {
  const [prestamos, setPrestamos] = useState([]);
  const [selectedPrestamo, setSelectedPrestamo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrestamos = async () => {
      try {
        const response = await apiClient.get('/prestamos/');
        setPrestamos(response.data.data); // Acceder a 'data' en la respuesta
      } catch (error) {
        console.error('Error al obtener préstamos:', error);
      }
    };

    fetchPrestamos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await apiClient.delete(`/prestamos/${selectedPrestamo}`);
      if (response.status === 200) {
        console.log('Préstamo eliminado:', selectedPrestamo);
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
        <select
          value={selectedPrestamo}
          onChange={(e) => setSelectedPrestamo(e.target.value)}
          required
        >
          <option value="">Seleccione un Préstamo</option>
          {prestamos.map((prestamo) => (
            <option key={prestamo.prestamo_id} value={prestamo.prestamo_id}>
              ID: {prestamo.prestamo_id}, Cliente: {prestamo.cliente_nombre}
            </option>
          ))}
        </select>
        <button type="submit">Eliminar Préstamo</button>
      </form>
      <button type="button" onClick={() => navigate('/dashboard')} className="back-button">
        Regresar al Dashboard
      </button>
    </div>
  );
}

export default BajaPrestamo;
