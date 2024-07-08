import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Prestamo } from '../../types';
import './GestionPrestamos.css';

const initialPrestamos: Prestamo[] = [
  { id: 1, clienteId: 101, monto: 1000 },
  { id: 2, clienteId: 102, monto: 2000 },
  { id: 3, clienteId: 103, monto: 3000 },
];

function GestionPrestamos() {
  const [prestamos, setPrestamos] = useState<Prestamo[]>(initialPrestamos);
  const [clienteId, setClienteId] = useState('');
  const [monto, setMonto] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoPrestamo: Prestamo = {
      id: prestamos.length + 1,
      clienteId: parseInt(clienteId, 10),
      monto: parseFloat(monto),
    };
    setPrestamos([...prestamos, nuevoPrestamo]);
    setClienteId('');
    setMonto('');
  };

  return (
    <div className="gestion-prestamos-container">
      <h1>Gestión de Préstamos</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID del Cliente"
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />
        <button type="submit">Agregar Préstamo</button>
      </form>
      <table className="prestamos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.map((prestamo) => (
            <tr key={prestamo.id}>
              <td>{prestamo.id}</td>
              <td>{prestamo.monto}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={() => navigate('/dashboard')} className="back-button">
        Regresar al Dashboard
      </button>
    </div>
  );
}

export default GestionPrestamos;
