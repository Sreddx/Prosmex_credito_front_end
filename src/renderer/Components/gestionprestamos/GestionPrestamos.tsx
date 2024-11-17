import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Prestamo } from '../../types';
import { createPrestamo, listTiposPrestamo, listAvales, listClientesRegistroPrestamo } from './Api';
import './GestionPrestamos.css';
import ModalAlertas from '../modalAlertas/ModalAlertas';
import PaginatedDropDown from '../paginateddropdown/PaginatedDropDown';
import SelectionModal from '../selectionmodal/SelectionModal';

function GestionPrestamos() {
  const [clienteId, setClienteId] = useState('');
  const [selectedClienteName, setSelectedClienteName] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [montoPrestamo, setMontoPrestamo] = useState(0);
  const [tipoPrestamoId, setTipoPrestamoId] = useState('');
  const [avalId, setAvalId] = useState('');
  const [selectedAvalName, setSelectedAvalName] = useState('');
  const [tiposPrestamo, setTiposPrestamo] = useState<
    { nombre: string; tipo_prestamo_id: number }[]
  >([]);
  const [avales, setAvales] = useState<{ id: number; nombre: string }[]>([]);
  const [clientes, setClientes] = useState<{ id: number; nombre: string }[]>([]);
  const [clientesPage, setClientesPage] = useState(1);
  const [clientesTotalPages, setClientesTotalPages] = useState(1);
  const [avalesPage, setAvalesPage] = useState(1);
  const [avalesTotalPages, setAvalesTotalPages] = useState(1);
  const [isClientesModalOpen, setIsClientesModalOpen] = useState(false);
  const [isAvalesModalOpen, setIsAvalesModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleClienteSelect = (cliente: { id: number; nombre: string }) => {
    setClienteId(String(cliente.id));
    setSelectedClienteName(cliente.nombre);
    setIsClientesModalOpen(false);
  };

  const handleAvalSelect = (aval: { id: number; nombre: string }) => {
    setAvalId(String(aval.id));
    setSelectedAvalName(aval.nombre);
    setIsAvalesModalOpen(false);
  };

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
      console.log('Create Prestamo Response:', response);

      // Check if response has a status code of 201, indicating success
      if (response?.status === 201 || response?.data?.message === 'Prestamo created successfully') {
        setModalMessage('Préstamo creado con éxito');
        setIsModalOpen(true);

        // Cerrar el modal y redirigir al Dashboard después de 2 segundos
        setTimeout(() => {
          setIsModalOpen(false);
          navigate('/dashboard');
        }, 2000);
      } else {
        // If response does not indicate success, show an error message
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

        <button type="submit">Crear Préstamo</button>
      </form>

      <button type="button" onClick={() => navigate('/dashboard')} className="back-button">
        Regresar al Dashboard
      </button>

      <ModalAlertas
        message={modalMessage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Modals for selection */}
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
}

export default GestionPrestamos;
