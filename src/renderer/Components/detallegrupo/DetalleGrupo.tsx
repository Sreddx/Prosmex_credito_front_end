import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DetalleGrupo.css';

interface Prestamo {
  cliente: string;
  aval: string;
  fechaInicio: string;
  prestamo: string;
  tipo: number;
  numPagos: number;
  semanasDebe: number;
}

function DetalleGrupo() {
  const navigate = useNavigate();
  
  // Estado inicial para los datos de préstamos (puede ser dinámico luego)
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);

  useEffect(() => {
    // Simula una llamada para obtener los detalles del grupo, puedes reemplazar esto con una llamada a tu API
    const prestamosGrupo = [
      { cliente: 'Javier Lopez', aval: '', fechaInicio: '', prestamo: '$5,000.00', tipo: 14, numPagos: 9, semanasDebe: 6 },
      { cliente: 'Salvador Cardona', aval: 'Javier Lopez', fechaInicio: '', prestamo: '$3,000.00', tipo: 14, numPagos: 9, semanasDebe: 5 }
    ];
    setPrestamos(prestamosGrupo);
  }, []);

  return (
    <div className="detalle-grupo-container">
      <h1>Detalle del Grupo</h1>
      <table className="detalle-grupo-table">
        <thead>
          <tr>
            <th>CLIENTE</th>
            <th>AVAL</th>
            <th>FECHA DE INICIO</th>
            <th>PRÉSTAMO</th>
            <th>TIPO</th>
            <th># de Pagos</th>
            <th>Semanas que debe</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.map((prestamo, index) => (
            <tr key={index}>
              <td>{prestamo.cliente}</td>
              <td>{prestamo.aval}</td>
              <td>{prestamo.fechaInicio}</td>
              <td>{prestamo.prestamo}</td>
              <td>{prestamo.tipo}</td>
              <td>{prestamo.numPagos}</td>
              <td>{prestamo.semanasDebe}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <button className="back-button" onClick={() => navigate('/dashboard')}>
        Regresar al Dashboard
      </button>
    </div>
  );
}

export default DetalleGrupo;
