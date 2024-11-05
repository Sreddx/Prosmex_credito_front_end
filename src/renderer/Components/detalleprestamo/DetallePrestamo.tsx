import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './DetallePrestamo.css';
import { getPagosByPrestamo, addPago } from './api';
import ModalAlertas from '../modalAlertas/ModalAlertas';

interface Pago {
  grupo: string;
  cliente: string;
  montoPrestamo: string;
  montoPago: string;
  fechaPago: string;
}

function DetallePrestamo() {
  const navigate = useNavigate();
  const { prestamo_id } = useParams<{ prestamo_id: string }>();
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  const formatCurrency = (value: string) => {
    const numberValue = parseFloat(value);
    return isNaN(numberValue)
      ? 'N/A'
      : new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(numberValue);
  };

  const getCurrentDate = (): string => {
    const date = new Date();
    return date.toISOString().split('T')[0];
  };

  const [nuevoPago, setNuevoPago] = useState<Pago>({
    grupo: '',
    cliente: '',
    montoPrestamo: '',
    montoPago: '',
    fechaPago: getCurrentDate(),
  });

  useEffect(() => {
    const fetchPagosPrestamo = async () => {
      try {
        const data = await getPagosByPrestamo(Number(prestamo_id));
        const pagosMapeados = data.pagos.map((pago: any) => ({
          grupo: pago.GRUPO,
          cliente: pago.CLIENTE,
          montoPrestamo: pago.MONTO_PRESTAMO.toString(),
          montoPago: pago.MONTO_PAGO.toString(),
          fechaPago: pago.FECHA_PAGO,
        }));
        setPagos(pagosMapeados);
        setNuevoPago({
          grupo: pagosMapeados[0]?.grupo || '',
          cliente: pagosMapeados[0]?.cliente || '',
          montoPrestamo: pagosMapeados[0]?.montoPrestamo || '',
          montoPago: '',
          fechaPago: getCurrentDate(),
        });
        setLoading(false);
      } catch (err) {
        setError('Error al obtener los pagos del préstamo');
        console.error(err);
        setLoading(false);
      }
    };
    fetchPagosPrestamo();
  }, [prestamo_id]);

  const handleNuevoPagoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNuevoPago({
      ...nuevoPago,
      [e.target.name]: e.target.value,
    });
  };

  const guardarCambios = async () => {
    try {
      const formattedPago = {
        prestamo_id: Number(prestamo_id),
        monto_pagado: parseFloat(nuevoPago.montoPago),
      };
      await addPago(formattedPago);

      setModalMessage('Pago agregado exitosamente');
      setIsModalOpen(true);

      setTimeout(() => {
        setIsModalOpen(false);
        navigate(-1);
      }, 2000);
    } catch (err) {
      setModalMessage('Error al agregar el pago');
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Cargando pagos del préstamo...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="detalle-prestamo-container">
      <h1>Detalle del Préstamo {prestamo_id}</h1>
      <table className="detalle-prestamo-table">
        <thead>
          <tr>
            <th>GRUPO</th>
            <th>CLIENTE</th>
            <th>MONTO PRÉSTAMO</th>
            <th>MONTO PAGO</th>
            <th>FECHA PAGO</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((pago, index) => (
            <tr key={index}>
              <td>{pago.grupo}</td>
              <td>{pago.cliente}</td>
              <td>{formatCurrency(pago.montoPrestamo)}</td>
              <td>{formatCurrency(pago.montoPago)}</td>
              <td>{pago.fechaPago}</td>
            </tr>
          ))}
          <tr>
            <td>{nuevoPago.grupo}</td>
            <td>{nuevoPago.cliente}</td>
            <td>{formatCurrency(nuevoPago.montoPrestamo)}</td>
            <td>
              <input
                type="text"
                name="montoPago"
                value={nuevoPago.montoPago}
                onChange={handleNuevoPagoChange}
                placeholder="Ingresa el monto"
              />
            </td>
            <td>{nuevoPago.fechaPago}</td>
          </tr>
        </tbody>
      </table>
      <button className="guardar-button" onClick={guardarCambios}>
        Agregar Pago
      </button>
      <button className="back-button" onClick={() => navigate(-1)}>
        Regresar a Detalle de Grupo
      </button>
      <ModalAlertas message={modalMessage} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default DetallePrestamo;
