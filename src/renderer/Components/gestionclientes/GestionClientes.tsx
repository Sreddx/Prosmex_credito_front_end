import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Cliente } from '../../types';
import './GestionClientes.css';

function GestionClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar clientes existentes desde la API
    axios
      .get('/api/clientes')
      .then((response) => setClientes(response.data))
      .catch((error) => console.error('Error cargando clientes:', error));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoCliente: Omit<Cliente, 'id'> = { nombre, direccion, telefono };
    // Guardar nuevo cliente en la API
    axios
      .post('/api/clientes', nuevoCliente)
      .then((response) => setClientes([...clientes, response.data]))
      .catch((error) => console.error('Error guardando cliente:', error));
  };

  return (
    <div className="gestion-clientes-container">
      <h1>Gestión de Clientes</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <button type="submit">Agregar Cliente</button>
      </form>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            {cliente.nombre} - {cliente.direccion} - {cliente.telefono}
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => navigate('/dashboard')} className="back-button">
        Regresar al Dashboard
      </button>
    </div>
  );
}

export default GestionClientes;
