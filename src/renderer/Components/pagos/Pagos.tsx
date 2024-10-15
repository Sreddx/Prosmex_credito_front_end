// Pagos.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pagos.css';
import { getGrupos, getPrestamosByGrupo, createPago, Grupo, Prestamo } from './api';
import ModalAlertas from '../modalAlertas/ModalAlertas'; // Adjust the path accordingly

function Pagos() {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState<number | ''>('');
  const [prestamoSeleccionado, setPrestamoSeleccionado] = useState<number | ''>('');
  const [monto, setMonto] = useState<number>(0);
  const [fechaPago, setFechaPago] = useState<string>(new Date().toISOString().split('T')[0]);

  const [modalMessage, setModalMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch grupos from the backend
    const fetchGrupos = async () => {
      try {
        const data = await getGrupos();
        setGrupos(data);
      } catch (error) {
        setModalMessage('Error al cargar los grupos.');
        setIsModalOpen(true);
      }
    };

    fetchGrupos();
  }, []);

  useEffect(() => {
    if (grupoSeleccionado) {
      // Fetch prestamos for the selected grupo
      const fetchPrestamos = async () => {
        try {
          const data = await getPrestamosByGrupo(grupoSeleccionado as number);
          setPrestamos(data);
        } catch (error) {
          setModalMessage('Error al cargar los préstamos.');
          setIsModalOpen(true);
        }
      };

      fetchPrestamos();
    } else {
      setPrestamos([]);
      setPrestamoSeleccionado('');
    }
  }, [grupoSeleccionado]);

  const handleRegistrarPago = async () => {
    if (!grupoSeleccionado || !prestamoSeleccionado || monto <= 0) {
      setModalMessage('Por favor, completa todos los campos correctamente.');
      setIsModalOpen(true);
      return;
    }

    const pagoData = {
      fecha_pago: fechaPago,
      monto_pagado: monto,
      prestamo_id: prestamoSeleccionado as number,
    };

    try {
      await createPago(pagoData);
      setModalMessage('Pago registrado con éxito');
      setIsModalOpen(true);
      setMonto(0);
      setFechaPago(new Date().toISOString().split('T')[0]);
    } catch (error) {
      setModalMessage('Error al registrar el pago.');
      setIsModalOpen(true);
    }
  };

  return (
    <div className="pagos-container">
      <h1>Registro de Pagos</h1>
      <div className="form-container">
        <label htmlFor="grupo">Selecciona el Grupo:</label>
        <select
          id="grupo"
          value={grupoSeleccionado}
          onChange={(e) => setGrupoSeleccionado(Number(e.target.value))}
        >
          <option value="">Selecciona un grupo</option>
          {grupos.map((grupo) => (
            <option key={grupo.id} value={grupo.id}>
              {grupo.nombre}
            </option>
          ))}
        </select>

        <label htmlFor="prestamo">Selecciona el Préstamo:</label>
        <select
          id="prestamo"
          value={prestamoSeleccionado}
          onChange={(e) => setPrestamoSeleccionado(Number(e.target.value))}
          disabled={!grupoSeleccionado}
        >
          <option value="">Selecciona un préstamo</option>
          {prestamos.map((prestamo) => (
            <option key={prestamo.id} value={prestamo.id}>
              Préstamo {prestamo.id} - ${prestamo.monto} - {prestamo.cliente_nombrecompleto}
            </option>
          ))}
        </select>

        <label htmlFor="monto">Monto del Pago:</label>
        <input
          id="monto"
          type="number"
          value={monto}
          onChange={(e) => setMonto(Number(e.target.value))}
        />

        <label htmlFor="fecha">Fecha del Pago:</label>
        <input
          id="fecha"
          type="date"
          value={fechaPago}
          onChange={(e) => setFechaPago(e.target.value)}
        />

        <button className="registrar-button" onClick={handleRegistrarPago}>
          Registrar Pago
        </button>

        <button className="dashboard-button" onClick={() => navigate('/dashboard')}>
          Regresar al Dashboard
        </button>
      </div>

      <ModalAlertas
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default Pagos;
