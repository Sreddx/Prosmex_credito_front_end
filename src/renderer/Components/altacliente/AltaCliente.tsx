import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cliente } from '../../types';
import './AltaCliente.css';

function AltaCliente() {
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [colonia, setColonia] = useState('');
  const [cp, setCp] = useState('');
  const [codigoIne, setCodigoIne] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [numHijos, setNumHijos] = useState(0);
  const [propiedad, setPropiedad] = useState('');
  const [semilla, setSemilla] = useState(0);
  const [grupoId, setGrupoId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoCliente: Cliente = {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      colonia,
      cp,
      codigoIne,
      estadoCivil,
      numHijos,
      propiedad,
      semilla,
      grupoId,
    };
    try {
      const response = await fetch('/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoCliente),
      });
      if (response.ok) {
        console.log('Cliente dado de alta:', nuevoCliente);
        navigate('/dashboard');
      } else {
        console.error('Error al dar de alta al cliente');
      }
    } catch (error) {
      console.error('Error al dar de alta al cliente:', error);
    }
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
          required
        />
        <input
          type="text"
          placeholder="Apellido Paterno"
          value={apellidoPaterno}
          onChange={(e) => setApellidoPaterno(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Apellido Materno"
          value={apellidoMaterno}
          onChange={(e) => setApellidoMaterno(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Colonia"
          value={colonia}
          onChange={(e) => setColonia(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Código Postal"
          value={cp}
          onChange={(e) => setCp(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Código INE"
          value={codigoIne}
          onChange={(e) => setCodigoIne(e.target.value)}
          required
        />
        <select
          value={estadoCivil}
          onChange={(e) => setEstadoCivil(e.target.value)}
          required
        >
          <option value="">Estado Civil</option>
          <option value="casado">Casado</option>
          <option value="divorciado">Divorciado</option>
          <option value="viudo">Viudo</option>
          <option value="soltero">Soltero</option>
        </select>
        <label>
          Número de Hijos
          <input
            type="number"
            value={numHijos}
            onChange={(e) => setNumHijos(Number(e.target.value))}
            required
          />
        </label>
        <select
          value={propiedad}
          onChange={(e) => setPropiedad(e.target.value)}
          required
        >
          <option value="">Propiedad</option>
          <option value="casa_propia">Casa Propia</option>
          <option value="rentada">Rentada</option>
          <option value="prestada">Prestada</option>
        </select>
        <label>
          Semilla
          <input
            type="number"
            value={semilla}
            onChange={(e) => setSemilla(Number(e.target.value))}
            required
          />
        </label>
        <input
          type="text"
          placeholder="Grupo ID"
          value={grupoId}
          onChange={(e) => setGrupoId(e.target.value)}
          required
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
