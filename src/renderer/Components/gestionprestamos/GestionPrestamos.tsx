import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Prestamo } from '../../types';
import { createPrestamo, listTiposPrestamo, listAvales, listClientesRegistroPrestamo } from './Api'; 
import './GestionPrestamos.css';
import ModalAlertas from '../modalAlertas/ModalAlertas'; // Importar ModalAlertas para mostrar mensajes de éxito

function GestionPrestamos() {
  const [clienteId, setClienteId] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [montoPrestamo, setMontoPrestamo] = useState(0);
  const [tipoPrestamoId, setTipoPrestamoId] = useState('');
  const [avalId, setAvalId] = useState('');
  const [tiposPrestamo, setTiposPrestamo] = useState<
    {
      nombre: string;
      tipo_prestamo_id: number;
    }[]
  >([]);
  const [avales, setAvales] = useState<{ id: number; nombre: string }[]>([]);
  const [clientes, setClientes] = useState<{ id: number; nombre: string }[]>([]);
  const [modalMessage, setModalMessage] = useState('');  // Estado para el mensaje del modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const navigate = useNavigate();

  // Obtener la lista de clientes, tipos de préstamos y avales
  useEffect(() => {
    const fetchClientes = async () => {
      const clientes = await listClientesRegistroPrestamo();
      if ('error' in clientes) {
        console.error(clientes.error);
      } else {
        setClientes(clientes);
      }
    };

    const fetchTiposPrestamo = async () => {
      const tipos = await listTiposPrestamo();
      if ('error' in tipos) {
        console.error(tipos.error);
      } else {
        setTiposPrestamo(tipos);
      }
    };

    const fetchAvales = async () => {
      const avalesList = await listAvales();
      if ('error' in avalesList) {
        console.error(avalesList.error);
      } else {
        setAvales(avalesList);
      }
    };

    fetchClientes();
    fetchTiposPrestamo();
    fetchAvales();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoPrestamo: Prestamo = {
      cliente_id: Number(clienteId),
      fecha_inicio: fechaInicio,
      monto_prestamo: montoPrestamo,
      tipo_prestamo_id: Number(tipoPrestamoId),
      aval_id: Number(avalId),
    };
    try {
      const response = await createPrestamo(nuevoPrestamo);
      if (response?.status === 201 || response?.data?.message === 'Prestamo created successfully') {
        setModalMessage('Préstamo creado con éxito');
        setIsModalOpen(true);

        // Cerrar el modal y redirigir al Dashboard después de 2 segundos
        setTimeout(() => {
          setIsModalOpen(false);
          navigate('/dashboard');
        }, 2000);
      } else {
        setModalMessage('Error al crear el préstamo.');
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error al crear el préstamo:', error);
      setModalMessage('Error al crear el préstamo.');
      setIsModalOpen(true);
    }
  };

  return (
    <div className="gestion-prestamos-form-container">
      <form onSubmit={handleSubmit} className="gestion-prestamos-form">
        <h1>Crear Préstamo</h1>

        <label htmlFor="clienteId">
          Cliente
          <select
            id="clienteId"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            required
          >
            <option value="">Seleccione un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="fechaInicio">
          Fecha de Inicio
          <input
            id="fechaInicio"
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            required
          />
        </label>

        <label htmlFor="montoPrestamo">
          Monto del Préstamo
          <input
            id="montoPrestamo"
            type="number"
            value={montoPrestamo}
            onChange={(e) => setMontoPrestamo(Number(e.target.value))}
            required
          />
        </label>

        <label htmlFor="tipoPrestamoId">
          Tipo de Préstamo
          <select
            id="tipoPrestamoId"
            value={tipoPrestamoId}
            onChange={(e) => setTipoPrestamoId(e.target.value)}
            required
          >
            <option value="">Seleccione el tipo de préstamo</option>
            {tiposPrestamo.map((tipo) => (
              <option key={tipo.tipo_prestamo_id} value={tipo.tipo_prestamo_id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="avalId">
          Aval
          <select id="avalId" value={avalId} onChange={(e) => setAvalId(e.target.value)} required>
            <option value="">Seleccione un aval</option>
            {avales.map((aval) => (
              <option key={aval.id} value={aval.id}>
                {aval.nombre}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Crear Préstamo</button>
      </form>

      <button type="button" onClick={() => navigate('/dashboard')} className="back-button">
        Regresar al Dashboard
      </button>

      {/* Modal para mensajes de confirmación */}
      <ModalAlertas
        message={modalMessage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default GestionPrestamos;
