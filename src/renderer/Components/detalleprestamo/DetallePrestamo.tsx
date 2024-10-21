import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './DetallePrestamo.css';

interface Pago {
  grupo: string;
  cliente: string;
  montoPrestamo: string;
  montoPago: string;
  fechaPago: string;
}

function DetallePrestamo() {
  const navigate = useNavigate();
  const { prestamo_id } = useParams<{ prestamo_id: string }>(); // Obtén el id del préstamo de los params
  const [pagos, setPagos] = useState<Pago[]>([]);

  useEffect(() => {
    // Simula una llamada para obtener los pagos del préstamo, puedes reemplazar esto con una llamada a tu API
    const pagosPrestamo = [
      { grupo: 'Grupo 1', cliente: 'Javier Lopez', montoPrestamo: '$5,000.00', montoPago: '$500.00', fechaPago: '2023-03-01' },
      { grupo: 'Grupo 1', cliente: 'Javier Lopez', montoPrestamo: '$5,000.00', montoPago: '$500.00', fechaPago: '2023-03-08' },
      { grupo: 'Grupo 1', cliente: 'Javier Lopez', montoPrestamo: '$5,000.00', montoPago: '$500.00', fechaPago: '2023-03-15' }
    ];
    setPagos(pagosPrestamo);
  }, [prestamo_id]);

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
        </tbody>
      </table>
      <button className="back-button" onClick={() => navigate(-1)}>
        Regresar a Detalle de Grupo
      </button>
    </div>
  );
}

export default DetallePrestamo;
