import React, { useEffect, useState } from 'react';
import { listPrestamos } from '../gestionprestamos/Api'; // Adjust the import path as needed
import { PrestamoConNombre } from '../../types';
import './ListarPrestamos.css';

function ListarPrestamos() {
  const [prestamos, setPrestamos] = useState<PrestamoConNombre[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPrestamos = async (page = 1) => {
    try {
      const prestamosList = await listPrestamos(page);

      if ('error' in prestamosList) {
        setError(prestamosList.error);
      } else if (prestamosList.prestamos) {
        setPrestamos(prestamosList.prestamos);
        setCurrentPage(prestamosList.page);
        setTotalPages(prestamosList.total_pages);
      } else {
        setError('No data found');
      }
    } catch (err) {
      setError('Error al obtener la lista de préstamos');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPrestamos(currentPage);
  }, [currentPage]);

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
          {prestamos && prestamos.length > 0 ? (
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

      <div className="pagination-controls">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>

      <button type="button" onClick={() => window.history.back()} className="back-button">
        Volver al Dashboard
      </button>
    </div>
  );
}

export default ListarPrestamos;
