import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './DetalleGrupo.css';
import { getPrestamosByGrupo } from './api';

interface Prestamo {
  AVAL: string;
  CLIENTE: string;
  FECHA_PRÉSTAMO: string;
  GRUPO: string;
  MONTO_PRÉSTAMO: number;
  NUMERO_PAGOS: number;
  SEMANAS_QUE_DEBE: number;
  TIPO_PRESTAMO: string;
  prestamo_id: number;
}

function DetalleGrupo() {
  const { grupo_id } = useParams<{ grupo_id: string }>(); // Obtener el grupo_id desde la URL
  const navigate = useNavigate();

  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrestamosGrupo = async () => {
      try {
        const data = await getPrestamosByGrupo(Number(grupo_id));
        setPrestamos(data.prestamos);
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
            <th>FECHA DE PRÉSTAMO</th>
            <th>MONTO PRÉSTAMO</th>
            <th>TIPO</th>
            <th># de Pagos</th>
            <th>Semanas que debe</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.map((prestamo, index) => (
            <tr
              key={index}
              onClick={() => handleRowClick(prestamo.prestamo_id)}
              className="clickable-row"
            >
              <td>{prestamo.CLIENTE}</td>
              <td>{prestamo.AVAL}</td>
              <td>{prestamo.FECHA_PRÉSTAMO}</td>
              <td>{prestamo.MONTO_PRÉSTAMO}</td>
              <td>{prestamo.TIPO_PRESTAMO}</td>
              <td>{prestamo.NUMERO_PAGOS}</td>
              <td>{prestamo.SEMANAS_QUE_DEBE}</td>
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
