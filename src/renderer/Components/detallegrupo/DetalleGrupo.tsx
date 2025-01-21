import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './DetalleGrupo.css';
import { Prestamo } from 'src/renderer/types';
import { getPrestamosByGrupo, addPago } from './api';
import ModalAlertas from '../modalAlertas/ModalAlertas';

function DetalleGrupo() {
  const { grupo_id } = useParams<{ grupo_id: string }>();
  const navigate = useNavigate();

  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nuevoPago, setNuevoPago] = useState<{ [key: number]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  const perPage = 10;

  const formatCurrency = (value: number | undefined) => {
    return value !== undefined
      ? new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value)
      : 'N/A';
  };

  useEffect(() => {
    const fetchPrestamosGrupo = async () => {
      try {
        setLoading(true);
        const data = await getPrestamosByGrupo(Number(grupo_id), page, perPage);
        setPrestamos(data.prestamos);
        setTotalPages(data.total_pages);
        setLoading(false);
      } catch (err) {
        setError('Error al obtener los préstamos del grupo');
        setLoading(false);
      }
    };

    fetchPrestamosGrupo();
  }, [grupo_id, page]);

  const handleRowClick = (prestamo_id: number) => {
    navigate(`/detalle-prestamo/${prestamo_id}`);
  };

  const handleRenovarPrestamo = (prestamo: Prestamo) => {
    navigate('/gestion-prestamos', {
      state: {
        cliente_id: prestamo.CLIENTE_ID,
        fecha_inicio: prestamo.FECHA_PRÉSTAMO,
        monto_prestamo: prestamo.MONTO_PRÉSTAMO,
        tipo_prestamo_id: prestamo.TIPO_PRESTAMO_ID,
        aval_id: prestamo.AVAL_ID,
      },
    });
  };

  const handlePagoChange = (e: React.ChangeEvent<HTMLInputElement>, prestamo_id: number) => {
    setNuevoPago({ ...nuevoPago, [prestamo_id]: e.target.value });
  };

  const handleAgregarPago = async (prestamo_id: number) => {
    try {
      const monto_pagado = parseFloat(nuevoPago[prestamo_id]);
      if (isNaN(monto_pagado) || monto_pagado <= 0) {
        setModalMessage('Ingresa un monto válido para el pago');
        setIsModalOpen(true);
        return;
      }

      const pagoData = [{ prestamo_id, monto_pagado }];
      await addPago(pagoData); // Enviar como array
      setModalMessage('Pago agregado exitosamente');
      setIsModalOpen(true);

      const data = await getPrestamosByGrupo(Number(grupo_id), page, perPage);
      setPrestamos(data.prestamos);

      setNuevoPago({ ...nuevoPago, [prestamo_id]: '' });
    } catch (err) {
      setModalMessage('Error al agregar el pago');
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

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
            <th>FECHA DE PRÉSTAMO</th>
            <th>MONTO PRÉSTAMO (PAPEL)</th>
            <th>MONTO PRÉSTAMO (REAL)</th>
            <th>MONTO PAGADO</th>
            <th>MONTO TOTAL A PAGAR</th>
            <th>MONTO RESTANTE A PAGAR</th>
            <th>TIPO DE PRÉSTAMO</th>
            <th>SEMANAS COMPLETAS</th>
            <th>SEMANAS QUE DEBE</th>
            <th>ES RENOVACION</th>
            <th>COMPLETADO</th>
            <th>COBRANZA IDEAL SEMANAL</th>
            <th>MONTO PAGO</th>
            <th>ACCIÓN</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.map((prestamo, index) => (
            <tr
              key={index}
              className="clickable-row"
              onClick={() => handleRowClick(prestamo.PRESTAMO_ID)}
            >
              <td>{prestamo.CLIENTE}</td>
              <td>{prestamo.AVAL}</td>
              <td>{prestamo.FECHA_PRÉSTAMO}</td>
              <td>{formatCurrency(prestamo.MONTO_PRÉSTAMO)}</td>
              <td>{formatCurrency(prestamo.MONTO_PRÉSTAMO_REAL)}</td>
              <td>{formatCurrency(prestamo.MONTO_PAGADO)}</td>
              <td>{formatCurrency(prestamo.MONTO_UTILIDAD)}</td>
              <td>{formatCurrency(prestamo.MONTO_UTILIDAD - prestamo.MONTO_PAGADO)}</td>
              <td>{prestamo.TIPO_PRESTAMO}</td>
              <td>{prestamo.NUMERO_PAGOS}</td>
              <td>{prestamo.SEMANAS_QUE_DEBE}</td>
              <td>{prestamo.RENOVACION ? 'Sí' : 'No'}</td>
              <td>{prestamo.COMPLETADO ? 'Sí' : 'No'}</td>
              <td>{formatCurrency(prestamo.COBRANZA_IDEAL_SEMANAL)}</td>
              <td>
                <input
                  type="text"
                  value={nuevoPago[prestamo.PRESTAMO_ID] || ''}
                  onChange={(e) => handlePagoChange(e, prestamo.PRESTAMO_ID)}
                  placeholder="Monto del pago"
                  onClick={(e) => e.stopPropagation()} // Detener la propagación del evento
                />
              </td>
              <td onClick={(e) => e.stopPropagation()}>
                <button
                  className="guardar-button"
                  onClick={() => handleAgregarPago(prestamo.PRESTAMO_ID)}
                >
                  Agregar Pago
                </button>
                <button
                  className="guardar-button"
                  onClick={() => handleRenovarPrestamo(prestamo)}
                >
                  Renovar Préstamo
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-controls">
        <button onClick={goToPreviousPage} disabled={page === 1}>
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={page === totalPages}>
          Siguiente
        </button>
      </div>

      <button className="back-button" onClick={() => navigate('/dashboard')}>
        Regresar al Dashboard
      </button>

      <ModalAlertas message={modalMessage} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default DetalleGrupo;
