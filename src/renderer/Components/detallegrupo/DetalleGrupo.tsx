import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Importa useParams para obtener el grupo_id
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
  const { grupo_id } = useParams(); // Obtén el grupo_id desde la URL
  const navigate = useNavigate();
  
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [loading, setLoading] = useState(true);  // Estado de carga
  const [error, setError] = useState<string | null>(null);  // Estado de error

  useEffect(() => {
    // Simula una llamada para obtener los detalles del grupo basado en grupo_id, reemplaza esto con una llamada a tu API
    const fetchPrestamosGrupo = async () => {
      try {
        // Aquí deberías realizar una llamada real a tu API para obtener los préstamos de un grupo específico
        // const response = await apiClient.get(`/grupos/${grupo_id}/prestamos`);
        // setPrestamos(response.data.prestamos);
        
        // Simulación de datos:
        const prestamosGrupo = [
          { cliente: 'Javier Lopez', aval: '', fechaInicio: '2023-01-01', prestamo: '$5,000.00', tipo: 14, numPagos: 9, semanasDebe: 6 },
          { cliente: 'Salvador Cardona', aval: 'Javier Lopez', fechaInicio: '2023-02-01', prestamo: '$3,000.00', tipo: 14, numPagos: 9, semanasDebe: 5 }
        ];
        setPrestamos(prestamosGrupo);
        setLoading(false); // Desactivar estado de carga
      } catch (err) {
        setError('Error al obtener los préstamos del grupo');
        setLoading(false); // Desactivar estado de carga
      }
    };

    fetchPrestamosGrupo();
  }, [grupo_id]); // Dependencia en grupo_id para que actualice si cambia

  // Manejo de estado de carga o error
  if (loading) {
    return <div>Cargando datos del grupo...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
