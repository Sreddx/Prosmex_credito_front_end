import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PrestamoRenovacion } from '../../types';
import { createPrestamo, listTiposPrestamo, listAvales, listClientesRegistroPrestamo } from './Api';
import ModalAlertas from '../modalAlertas/ModalAlertas';
import SelectionModal from '../selectionmodal/SelectionModal';
import './GestionPrestamos.css';

const GestionPrestamos: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // If data was passed via navigate (from the renovar flow), it is read here.
  const prestamoRenovacion = location.state as Partial<PrestamoRenovacion> | undefined;

  const getCurrentDate = () => new Date().toISOString().split('T')[0];

  // Initialize state using passed values if available, otherwise use defaults.
  const [clienteId, setClienteId] = useState<string>(
    prestamoRenovacion?.cliente_id?.toString() || '',
  );
  const [selectedClienteName, setSelectedClienteName] = useState<string>('');
  const [fechaInicio, setFechaInicio] = useState<string>(
    prestamoRenovacion?.fecha_inicio || getCurrentDate(),
  );
  const [montoPrestamo, setMontoPrestamo] = useState<number>(
    prestamoRenovacion?.monto_prestamo || 0,
  );
  const [tipoPrestamoId, setTipoPrestamoId] = useState<string>(
    prestamoRenovacion?.tipo_prestamo_id?.toString() || '',
  );
  const [avalId, setAvalId] = useState<string>(prestamoRenovacion?.aval_id?.toString() || '');
  const [selectedAvalName, setSelectedAvalName] = useState<string>('');
  const [tiposPrestamo, setTiposPrestamo] = useState<
    { nombre: string; tipo_prestamo_id: number }[]
  >([]);
  const [clientes, setClientes] = useState<{ id: number; nombre: string }[]>([]);
  const [clientesPage, setClientesPage] = useState<number>(1);
  const [clientesTotalPages, setClientesTotalPages] = useState<number>(1);
  const [avales, setAvales] = useState<{ id: number; nombre: string }[]>([]);
  const [avalesPage, setAvalesPage] = useState<number>(1);
  const [avalesTotalPages, setAvalesTotalPages] = useState<number>(1);
  const [isClientesModalOpen, setIsClientesModalOpen] = useState<boolean>(false);
  const [isAvalesModalOpen, setIsAvalesModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Fetch lists for selection
  const fetchClientes = async (page: number) => {
    const response = await listClientesRegistroPrestamo(page);
    if ('error' in response) {
      console.error(response.error);
    } else {
      setClientes(response.clientes);
      setClientesTotalPages(response.total_pages);
    }
  };

  const fetchAvales = async (page: number) => {
    const response = await listAvales(page);
    if ('error' in response) {
      console.error(response.error);
    } else {
      setAvales(response.avales);
      setAvalesTotalPages(response.total_pages);
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

  useEffect(() => {
    fetchClientes(clientesPage);
    fetchAvales(avalesPage);
    fetchTiposPrestamo();
  }, [clientesPage, avalesPage]);

  // When the lists are loaded, update the pre-selected names if data was passed in.
  useEffect(() => {
    if (prestamoRenovacion) {
      const cliente = clientes.find((c) => c.id === Number(prestamoRenovacion.cliente_id));
      const aval = avales.find((a) => a.id === Number(prestamoRenovacion.aval_id));
      const tipoPrestamo = tiposPrestamo.find(
        (t) => t.tipo_prestamo_id === prestamoRenovacion.tipo_prestamo_id,
      );

      if (cliente) setSelectedClienteName(cliente.nombre);
      if (aval) setSelectedAvalName(aval.nombre);
      if (tipoPrestamo) setTipoPrestamoId(tipoPrestamo.tipo_prestamo_id.toString());
    }
  }, [clientes, avales, tiposPrestamo, prestamoRenovacion]);

  const handleClienteSelect = (cliente: { id: number; nombre: string }) => {
    setClienteId(cliente.id.toString());
    setSelectedClienteName(cliente.nombre);
    setIsClientesModalOpen(false);
  };

  const handleAvalSelect = (aval: { id: number; nombre: string }) => {
    setAvalId(aval.id.toString());
    setSelectedAvalName(aval.nombre);
    setIsAvalesModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoPrestamo = {
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
        <h1>{prestamoRenovacion ? 'Renovar Préstamo' : 'Crear Préstamo'}</h1>

        <label htmlFor="clienteId">
          Cliente
          <button type="button" onClick={() => setIsClientesModalOpen(true)}>
            {selectedClienteName || 'Seleccione un cliente'}
          </button>
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
          <button type="button" onClick={() => setIsAvalesModalOpen(true)}>
            {selectedAvalName || 'Seleccione un aval'}
          </button>
        </label>

        <button type="submit">{prestamoRenovacion ? 'Renovar Préstamo' : 'Crear Préstamo'}</button>
      </form>

      <button type="button" onClick={() => navigate('/dashboard')} className="back-button">
        Regresar al Dashboard
      </button>

      <ModalAlertas
        message={modalMessage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <SelectionModal
        isOpen={isClientesModalOpen}
        title="Seleccione un cliente"
        items={clientes}
        currentPage={clientesPage}
        totalPages={clientesTotalPages}
        onClose={() => setIsClientesModalOpen(false)}
        onSelect={handleClienteSelect}
        onPreviousPage={() => setClientesPage((prev) => Math.max(prev - 1, 1))}
        onNextPage={() => setClientesPage((prev) => Math.min(prev + 1, clientesTotalPages))}
        renderItem={(item) => <>{item.nombre}</>}
      />

      <SelectionModal
        isOpen={isAvalesModalOpen}
        title="Seleccione un aval"
        items={avales}
        currentPage={avalesPage}
        totalPages={avalesTotalPages}
        onClose={() => setIsAvalesModalOpen(false)}
        onSelect={handleAvalSelect}
        onPreviousPage={() => setAvalesPage((prev) => Math.max(prev - 1, 1))}
        onNextPage={() => setAvalesPage((prev) => Math.min(prev + 1, avalesTotalPages))}
        renderItem={(item) => <>{item.nombre}</>}
      />
    </div>
  );
};

export default GestionPrestamos;
