import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './DetalleGrupo.css';

interface Prestamo {
  cliente: string;
  aval: string;
  fechaInicio: string;
  prestamo: string;
  tipo: number;
  numPagos: number;
  semanasDebe: number;
  prestamo_id: number; // Nuevo campo para manejar el ID del préstamo
}

function DetalleGrupo() {
  const { grupo_id } = useParams(); // Obtener el grupo_id desde la URL
  const navigate = useNavigate();
  
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrestamosGrupo = async () => {
      try {
        const prestamosGrupo = [
          { cliente: 'Javier Lopez', aval: '', fechaInicio: '2023-01-01', prestamo: '$5,000.00', tipo: 14, numPagos: 9, semanasDebe: 6, prestamo_id: 1 },
          { cliente: 'Salvador Cardona', aval: 'Javier Lopez', fechaInicio: '2023-02-01', prestamo: '$3,000.00', tipo: 14, numPagos: 9, semanasDebe: 5, prestamo_id: 2 }
        ];
        setPrestamos(prestamosGrupo);
        setLoading(false);
      } catch (err) {
        setError('Error al obtener los préstamos del grupo');
        setLoading(false);
      }
    };

    fetchPrestamosGrupo();
  }, [grupo_id]);

  if (loading) {
    return <div>Cargando datos del grupo...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Función para redirigir al detalle del préstamo
  const handleRowClick = (prestamo_id: number) => {
    navigate(`/detalle-prestamo/${prestamo_id}`);
  };

  return (
    <div className="detalle-grupo-container">
      <h1>Detalle del Grupo {grupo_id}</h1>
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
            <tr key={index} onClick={() => handleRowClick(prestamo.prestamo_id)} className="clickable-row">
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
