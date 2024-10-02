import React, { useEffect, useState } from 'react';
import { listPrestamos } from '../gestionprestamos/Api'; // Ajusta la ruta según tu estructura
import { Prestamo, PrestamoConNombre } from '../../types';
import './ListarPrestamos.css';

function ListarPrestamos() {
  const [prestamos, setPrestamos] = useState<PrestamoConNombre[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrestamos = async () => {
      try {
        const prestamosList = await listPrestamos();

        // Verificamos si 'prestamosList' es un error o un array de datos
        if ('error' in prestamosList) {
          setError(prestamosList.error); // Si es un error, actualizamos el estado del error
        } else {
          setPrestamos(prestamosList.data); // Si es una lista, actualizamos el estado de los préstamos
        }
      } catch (err) {
        setError('Error al obtener la lista de préstamos');
        console.error(err);
      }
    };

    fetchPrestamos();
  }, []);

  return (
    <div className="listar-prestamos-container">
      <h1>Listado de Préstamos</h1>
      {error && <p className="error">{error}</p>}
      <table className="listar-prestamos-table">
        <thead>
          <tr>
            <th>ID Préstamo</th>
            <th>Cliente</th>
            <th>Fecha de Inicio</th>
            <th>Monto</th>
            <th>Aval</th>
            <th>Tipo de Préstamo</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.length > 0 ? (
            prestamos.map((prestamo) => (
              <tr key={prestamo.prestamo_id}>
                <td>{prestamo.prestamo_id}</td>
                <td>{prestamo.cliente_nombre}</td>
                <td>{new Date(prestamo.fecha_inicio).toLocaleDateString()}</td>
                <td>{prestamo.monto_prestamo}</td>
                <td>{prestamo.aval_nombre}</td>
                <td>{prestamo.tipo_prestamo_nombre}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No se encontraron préstamos</td>
            </tr>
          )}
        </tbody>
      </table>

      <button type="button" onClick={() => window.history.back()} className="back-button">
        Volver al Dashboard
      </button>
    </div>
  );
}

export default ListarPrestamos;
