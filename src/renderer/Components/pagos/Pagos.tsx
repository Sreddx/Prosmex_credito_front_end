import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pagos.css';

interface Grupo {
  id: number;
  nombre: string;
}

interface Prestamo {
  id: number;
  monto: number;
}

function Pagos() {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState<number | ''>('');
  const [prestamoSeleccionado, setPrestamoSeleccionado] = useState<number | ''>('');
  const [monto, setMonto] = useState<number>(0);
  const [fechaPago, setFechaPago] = useState<string>(new Date().toISOString().split('T')[0]);

  const navigate = useNavigate();

  useEffect(() => {
    // Aquí cargarías los grupos y préstamos desde tu API o backend
    setGrupos([
      { id: 1, nombre: 'OCOTLAN 3' },
      { id: 2, nombre: 'TEPA 2' },
    ]);

    setPrestamos([
      { id: 34, monto: 3000 },
      { id: 37, monto: 2000 },
    ]);
  }, []);

  const handleRegistrarPago = () => {
    if (!grupoSeleccionado || !prestamoSeleccionado || monto <= 0) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    // Lógica para registrar el pago (enviar los datos al backend)
    console.log({
      grupo: grupoSeleccionado,
      prestamo: prestamoSeleccionado,
      monto,
      fecha: fechaPago,
    });

    alert('Pago registrado con éxito');
    setMonto(0); // Resetear el monto
    setFechaPago(new Date().toISOString().split('T')[0]); // Resetear la fecha
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
        >
          <option value="">Selecciona un préstamo</option>
          {prestamos.map((prestamo) => (
            <option key={prestamo.id} value={prestamo.id}>
              Préstamo {prestamo.id} - ${prestamo.monto}
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
    </div>
  );
}

export default Pagos;
