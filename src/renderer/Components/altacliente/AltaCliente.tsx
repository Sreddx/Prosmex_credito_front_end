import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cliente } from '../../types';
import './AltaCliente.css';

function AltaCliente() {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoCliente: Cliente = { nombre, direccion, telefono };
    console.log('Cliente dado de alta:', nuevoCliente);
    // Aquí puedes hacer una llamada a la API para guardar el nuevo cliente
  };

  return (
    <div className="alta-cliente-form-container">
      <form onSubmit={handleSubmit} className="alta-cliente-form">
        <h1>Alta de Cliente</h1>
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
        <button type="submit">Dar de alta</button>
      </form>
      <button type="button" onClick={() => navigate('/dashboard')} className="back-button">
        Regresar al Dashboard
      </button>
    </div>
  );
}

export default AltaCliente;
