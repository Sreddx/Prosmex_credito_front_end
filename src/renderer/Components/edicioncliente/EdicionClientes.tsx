import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EdicionClientes.css';

interface Cliente {
  titular_id: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  colonia: string;
  cp: string;
  codigo_ine: string;
  estado_civil: string;
  num_hijos: number;
  propiedad: string;
  en_uso_aval: boolean;
  status_vencido: boolean;
  semilla: number;
  grupo_id: string;
}

function EdicionClientes() {
  const { id } = useParams<{ id: string }>();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await fetch(`/api/clientes/${id}`);
        const data = await response.json();
        setCliente(data);
      } catch (error) {
        console.error('Error fetching cliente:', error);
      }
    };

    fetchCliente();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCliente((prevCliente) => prevCliente ? { ...prevCliente, [name]: value } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/clientes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
      });
      if (response.ok) {
        console.log('Cliente actualizado:', cliente);
        navigate('/gestionclientes');
      } else {
        console.error('Error actualizando cliente');
      }
    } catch (error) {
      console.error('Error actualizando cliente:', error);
    }
  };

  if (!cliente) return <div>Cargando...</div>;

  return (
    <div className="edicion-cliente-form-container">
      <form onSubmit={handleSubmit} className="edicion-cliente-form">
        <h1>Edición de Cliente</h1>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={cliente.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="apellido_paterno"
          placeholder="Apellido Paterno"
          value={cliente.apellido_paterno}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="apellido_materno"
          placeholder="Apellido Materno"
          value={cliente.apellido_materno}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="colonia"
          placeholder="Colonia"
          value={cliente.colonia}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cp"
          placeholder="Código Postal"
          value={cliente.cp}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="codigo_ine"
          placeholder="Código INE"
          value={cliente.codigo_ine}
          onChange={handleChange}
          required
        />
        <select
          name="estado_civil"
          value={cliente.estado_civil}
          onChange={handleChange}
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
            name="num_hijos"
            value={cliente.num_hijos}
            onChange={handleChange}
            required
          />
        </label>
        <select
          name="propiedad"
          value={cliente.propiedad}
          onChange={handleChange}
          required
        >
          <option value="">Propiedad</option>
          <option value="casa_propia">Casa Propia</option>
          <option value="rentada">Rentada</option>
          <option value="prestada">Prestada</option>
        </select>
        <label>
          En Uso Aval
          <input
            type="checkbox"
            name="en_uso_aval"
            checked={cliente.en_uso_aval}
            onChange={(e) => setCliente((prevCliente) => prevCliente ? { ...prevCliente, en_uso_aval: e.target.checked } : null)}
          />
        </label>
        <label>
          Status Vencido
          <input
            type="checkbox"
            name="status_vencido"
            checked={cliente.status_vencido}
            onChange={(e) => setCliente((prevCliente) => prevCliente ? { ...prevCliente, status_vencido: e.target.checked } : null)}
          />
        </label>
        <input
          type="text"
          name="grupo_id"
          placeholder="Grupo ID"
          value={cliente.grupo_id}
          onChange={handleChange}
          required
        />
        <button type="submit">Actualizar Cliente</button>
      </form>
      <button type="button" onClick={() => navigate('/gestionclientes')} className="back-button">
        Regresar a Gestión de Clientes
      </button>
    </div>
  );
}

export default EdicionClientes;
