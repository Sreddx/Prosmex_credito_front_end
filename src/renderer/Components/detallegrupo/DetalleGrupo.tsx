import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './DetalleGrupo.css';
import { getPrestamosByGrupo, addPago } from './api';
import ModalAlertas from '../modalAlertas/ModalAlertas';

function DetalleGrupo() {
  const { grupo_id } = useParams<{ grupo_id: string }>();
  const navigate = useNavigate();

  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nuevoPago, setNuevoPago] = useState<{ [key: number]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  const formatCurrency = (value: number | undefined) => {
    return value !== undefined
      ? new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value)
      : 'N/A';
  };

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

  const handleRowClick = (prestamo_id: number) => {
    navigate(`/detalle-prestamo/${prestamo_id}`);
  };

  const handlePagoChange = (e: React.ChangeEvent<HTMLInputElement>, prestamo_id: number) => {
    setNuevoPago({ ...nuevoPago, [prestamo_id]: e.target.value });
  };

  const handleAgregarPago = async (prestamo_id: number) => {
    try {
      const monto_pagado = parseFloat(nuevoPago[prestamo_id]);
      if (isNaN(monto_pagado) || monto_pagado <= 0) {
        setModalMessage("Ingresa un monto válido para el pago");
        setIsModalOpen(true);
        return;
      }
      
      await addPago({ prestamo_id, monto_pagado });
      setModalMessage('Pago agregado exitosamente');
      setIsModalOpen(true);
      
      // Recargar datos del grupo después de agregar el pago
      const data = await getPrestamosByGrupo(Number(grupo_id));
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
            <th>MONTO PRÉSTAMO</th>
            <th>TIPO</th>
            <th># de Pagos</th>
            <th>Semanas que debe</th>
            <th>MONTO PAGO</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.map((prestamo, index) => (
            <tr key={index} className="clickable-row" onClick={() => handleRowClick(prestamo.prestamo_id)}>
              <td>{prestamo.CLIENTE}</td>
              <td>{prestamo.AVAL}</td>
              <td>{prestamo.FECHA_PRÉSTAMO}</td>
              <td>{formatCurrency(prestamo.MONTO_PRÉSTAMO)}</td>
              <td>{prestamo.TIPO_PRESTAMO}</td>
              <td>{prestamo.NUMERO_PAGOS}</td>
              <td>{prestamo.SEMANAS_QUE_DEBE}</td>
              <td>
                <input
                  type="text"
                  value={nuevoPago[prestamo.prestamo_id] || ''}
                  onChange={(e) => handlePagoChange(e, prestamo.prestamo_id)}
                  placeholder="Monto del pago"
                  onClick={(e) => e.stopPropagation()}
                />
              </td>
              <td>
                <button className="guardar-button" onClick={(e) => { e.stopPropagation(); handleAgregarPago(prestamo.prestamo_id); }}>
                  Agregar Pago
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="back-button" onClick={() => navigate('/dashboard')}>
        Regresar al Dashboard
      </button>

      <ModalAlertas message={modalMessage} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default DetalleGrupo;
