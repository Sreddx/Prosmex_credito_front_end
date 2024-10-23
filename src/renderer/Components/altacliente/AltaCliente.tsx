import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cliente } from '../../types';
import { createCliente } from '../gestionclientes/Api';
import apiClient from '../../utils/apiClient';
import ModalAlertas from '../modalAlertas/ModalAlertas';
import './AltaCliente.css';

interface Grupo {
  grupo_id: number;
  nombre_grupo: string;
  ruta_id: number;
}

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
  const [grupoId, setGrupoId] = useState<number | ''>('');
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const response = await apiClient.get('/grupos/');
        setGrupos(response.data.data);
      } catch (error) {
        console.error('Error al obtener los grupos:', error);
      }
    };
    fetchGrupos();
  }, []);

  const validarFormulario = (): boolean => {
    if (cp.length !== 5 || isNaN(Number(cp))) {
      setModalMessage('El código postal debe tener 5 dígitos numéricos.');
      setIsModalOpen(true);
      return false;
    }
    if (colonia.trim() === '') {
      setModalMessage('La colonia no puede estar vacía.');
      setIsModalOpen(true);
      return false;
    }
    if (codigoIne.length !== 13) {
      setModalMessage('El código INE debe tener 13 caracteres.');
      setIsModalOpen(true);
      return false;
    }
    if (numHijos < 0) {
      setModalMessage('El número de hijos no puede ser negativo.');
      setIsModalOpen(true);
      return false;
    }
    if (!estadoCivil) {
      setModalMessage('Seleccione un estado civil.');
      setIsModalOpen(true);
      return false;
    }
    if (!propiedad) {
      setModalMessage('Seleccione el tipo de propiedad.');
      setIsModalOpen(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) return;

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

    try {
      const response = await createCliente(nuevoCliente);

      if (response?.status === 201 || response?.data?.message === 'Cliente created successfully') {
        setModalMessage('Cliente dado de alta con éxito');
        setIsModalOpen(true);

        setTimeout(() => {
          setIsModalOpen(false);
          navigate('/dashboard');
        }, 2000);
      } else {
        setModalMessage('Error al dar de alta al cliente.');
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error al dar de alta al cliente:', error);
      setModalMessage('Error al dar de alta al cliente.');
      setIsModalOpen(true);
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
          Grupo
          <select
            id="grupoId"
            value={grupoId}
            onChange={(e) => setGrupoId(Number(e.target.value))}
            required
          >
            <option value="">Seleccione un grupo</option>
            {grupos.map((grupo) => (
              <option key={grupo.grupo_id} value={grupo.grupo_id}>
                {`${grupo.nombre_grupo} - Con ruta ${grupo.ruta_id}`}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Dar de alta</button>
      </form>

      <button className="back-button" onClick={() => navigate('/dashboard')}>
        Regresar al Dashboard
      </button>

      <ModalAlertas
        message={modalMessage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default AltaCliente;
