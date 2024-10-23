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

  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [modalMessage, setModalMessage] = useState<string>(''); // Mensaje del modal

  const getCurrentDate = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
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

        // Mapeamos los campos de la respuesta a los que espera el componente
        const pagosMapeados = data.pagos.map((pago: any) => ({
          grupo: pago.GRUPO,
          cliente: pago.CLIENTE,
          montoPrestamo: pago.MONTO_PRESTAMO.toString(), // Convertimos el monto a string
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
        prestamo_id: Number(prestamo_id), // Enviamos el prestamo_id
        monto_pagado: parseFloat(nuevoPago.montoPago), // Enviamos el monto pagado como número
      };

      // Llamada a la API para agregar el pago
      await addPago(formattedPago);

      // Mostrar mensaje de éxito en el modal
      setModalMessage('Pago agregado exitosamente');
      setIsModalOpen(true);

      // Recargar la página después de 2 segundos
      setTimeout(() => {
        window.location.reload();
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
              <td>{pago.montoPrestamo}</td>
              <td>{pago.montoPago}</td>
              <td>{pago.fechaPago}</td>
            </tr>
          ))}
          {/* Nueva fila para agregar pago */}
          <tr>
            <td>{nuevoPago.grupo}</td>
            <td>{nuevoPago.cliente}</td>
            <td>{nuevoPago.montoPrestamo}</td>
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

      {/* Modal para mostrar mensajes */}
      <ModalAlertas message={modalMessage} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default DetallePrestamo;
