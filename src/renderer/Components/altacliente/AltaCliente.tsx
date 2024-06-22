import React, { useState } from 'react';
import './AltaCliente.css';

function AltaCliente() {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Cliente dado de alta:', { nombre, direccion, telefono });
  };

  return (
    <form onSubmit={handleSubmit} className="alta-cliente-form">
      <h1>Alta de Cliente</h1>
      <input type="text" placeholder="Nombre" onChange={(e) => setNombre(e.target.value)} />
      <input type="text" placeholder="Dirección" onChange={(e) => setDireccion(e.target.value)} />
      <input type="text" placeholder="Teléfono" onChange={(e) => setTelefono(e.target.value)} />
      <button type="submit">Dar de alta</button>
    </form>
  );
}

export default AltaCliente;
