import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cliente } from '../../types';
import { createCliente } from '../gestionclientes/Api'; // Ajusta la ruta según tu estructura
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
  const [grupoId, setGrupoId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoCliente: Cliente = {
      nombre,
      apellido_paterno: apellidoPaterno,
      apellido_materno: apellidoMaterno,
      colonia,
      cp,
      codigo_ine: codigoIne,
      estado_civil: estadoCivil,
      num_hijos: numHijos,
      propiedad,
      grupo_id: Number(grupoId),
    };

    console.log('Datos del nuevo cliente:', nuevoCliente);
    try {
      const response = await createCliente(nuevoCliente);
      if (response && response.status === 201) {
        console.log('Cliente dado de alta:', nuevoCliente);
        alert('Cliente dado de alta con éxito');
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
        <label htmlFor="nombre">
          Nombre
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>
        <label htmlFor="apellidoPaterno">
          Apellido Paterno
          <input
            id="apellidoPaterno"
            type="text"
            value={apellidoPaterno}
            onChange={(e) => setApellidoPaterno(e.target.value)}
            required
          />
        </label>
        <label htmlFor="apellidoMaterno">
          Apellido Materno
          <input
            id="apellidoMaterno"
            type="text"
            value={apellidoMaterno}
            onChange={(e) => setApellidoMaterno(e.target.value)}
            required
          />
        </label>
        <label htmlFor="colonia">
          Colonia
          <input
            id="colonia"
            type="text"
            value={colonia}
            onChange={(e) => setColonia(e.target.value)}
            required
          />
        </label>
        <label htmlFor="cp">
          Código Postal
          <input id="cp" type="text" value={cp} onChange={(e) => setCp(e.target.value)} required />
        </label>
        <label htmlFor="codigoIne">
          Código INE
          <input
            id="codigoIne"
            type="text"
            value={codigoIne}
            onChange={(e) => setCodigoIne(e.target.value)}
            required
          />
        </label>
        <label htmlFor="estadoCivil">
          Estado Civil
          <select
            id="estadoCivil"
            value={estadoCivil}
            onChange={(e) => setEstadoCivil(e.target.value)}
            required
          >
            <option value="">Seleccione el estado civil</option>
            <option value="casado">Casado</option>
            <option value="divorciado">Divorciado</option>
            <option value="viudo">Viudo</option>
            <option value="soltero">Soltero</option>
          </select>
        </label>
        <label htmlFor="numHijos">
          Número de Hijos
          <input
            id="numHijos"
            type="number"
            value={numHijos}
            onChange={(e) => setNumHijos(Number(e.target.value))}
            required
          />
        </label>
        <label htmlFor="propiedad">
          Propiedad
          <select
            id="propiedad"
            value={propiedad}
            onChange={(e) => setPropiedad(e.target.value)}
            required
          >
            <option value="">Seleccione el tipo de propiedad</option>
            <option value="casa_propia">Casa Propia</option>
            <option value="rentada">Rentada</option>
            <option value="prestada">Prestada</option>
          </select>
        </label>
        <label htmlFor="grupoId">
          Grupo ID
          <input
            id="grupoId"
            type="text"
            value={grupoId}
            onChange={(e) => setGrupoId(e.target.value)}
            required
          />
        </label>
        <button type="submit">Dar de alta</button>
      </form>
      <button type="button" onClick={() => navigate('/dashboard')} className="back-button">
        Regresar al Dashboard
      </button>
    </div>
  );
}

export default AltaCliente;
