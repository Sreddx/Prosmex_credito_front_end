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
  
  // Obtener la fecha actual en formato YYYY-MM-DD
  const getCurrentDate = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Asegura que el mes tenga 2 dígitos
    const day = date.getDate().toString().padStart(2, '0'); // Asegura que el día tenga 2 dígitos
    return `${year}-${month}-${day}`;
  };

  const [nuevoPago, setNuevoPago] = useState<Pago>({
    grupo: '',
    cliente: '',
    montoPrestamo: '',
    montoPago: '',
    fechaPago: getCurrentDate(), // Iniciar con la fecha actual
  });

  useEffect(() => {
    // Simula una llamada para obtener los pagos del préstamo, puedes reemplazar esto con una llamada a tu API
    const pagosPrestamo = [
      { grupo: 'Grupo 1', cliente: 'Javier Lopez', montoPrestamo: '$5,000.00', montoPago: '$500.00', fechaPago: '2023-03-01' },
      { grupo: 'Grupo 1', cliente: 'Javier Lopez', montoPrestamo: '$5,000.00', montoPago: '$500.00', fechaPago: '2023-03-08' },
      { grupo: 'Grupo 1', cliente: 'Javier Lopez', montoPrestamo: '$5,000.00', montoPago: '$500.00', fechaPago: '2023-03-15' }
    ];
    setPagos(pagosPrestamo);
    setNuevoPago({
      grupo: 'Grupo 1', // Asumimos que el nuevo pago pertenece al mismo grupo
      cliente: 'Javier Lopez', // Asumimos que el cliente es el mismo para la nueva fila
      montoPrestamo: '$5,000.00', // Asumimos que el monto del préstamo es el mismo
      montoPago: '',
      fechaPago: getCurrentDate(), // Fecha actual predeterminada
    });
  }, [prestamo_id]);

  const handleNuevoPagoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNuevoPago({
      ...nuevoPago,
      [e.target.name]: e.target.value,
    });
  };

  const formatCurrency = (value: string | number) => {
    const number = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
  };

  const guardarCambios = () => {
    // Formatear el monto del pago a moneda
    const formattedPago = {
      ...nuevoPago,
      montoPago: formatCurrency(nuevoPago.montoPago)
    };

    // Guardar el nuevo pago en el estado
    setPagos([...pagos, formattedPago]);
    
    // Limpiar los campos del nuevo pago para permitir más entradas, pero mantener la fecha actual
    setNuevoPago({
      ...nuevoPago,
      montoPago: '',
      fechaPago: getCurrentDate(), // Mantener la fecha actual en cada nuevo registro
    });

    // Aquí puedes realizar una llamada a la API para persistir los datos en el backend
  };

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
            <td>
              {nuevoPago.fechaPago} {/* Mostrar la fecha actual como texto */}
            </td>
          </tr>
        </tbody>
      </table>
      <button className="guardar-button" onClick={guardarCambios}>
        Agregar Pago
      </button>
      <button className="back-button" onClick={() => navigate(-1)}>
        Regresar a Detalle de Grupo
      </button>
    </div>
  );
}

export default DetallePrestamo;
