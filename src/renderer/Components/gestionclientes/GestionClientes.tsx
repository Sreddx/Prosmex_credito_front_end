import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listClientes } from './Api'; // Ajusta la ruta según tu estructura
import { Cliente } from '../../types';
import './GestionClientes.css';

function GestionClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Función para obtener la lista de clientes
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await listClientes(); // Llamada al servicio API para listar clientes
        if ('error' in response) {
          setError(response.error);
        } else {
          setClientes(response); // Asignar clientes obtenidos del API
        }
      } catch (err) {
        setError('Error al cargar los clientes');
      }
    };

    fetchClientes();
  }, []);

  return (
    <div className="gestion-clientes-container">
      <h1>Listado de Clientes</h1>
      {error && <p className="error">{error}</p>}
      <table className="gestion-clientes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Colonia</th>
            <th>Código Postal</th>
            <th>Código INE</th>
            <th>Estado Civil</th>
            <th>Número de Hijos</th>
            <th>Propiedad</th>
            <th>Es Aval</th>
            <th>Grupo ID</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellido_paterno}</td>
              <td>{cliente.apellido_materno}</td>
              <td>{cliente.colonia}</td>
              <td>{cliente.cp}</td>
              <td>{cliente.codigo_ine}</td>
              <td>{cliente.estado_civil}</td>
              <td>{cliente.num_hijos}</td>
              <td>{cliente.propiedad}</td>
              <td>{cliente.es_aval ? 'Sí' : 'No'}</td>
              <td>{cliente.grupo_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={() => navigate('/dashboard')} className="back-button">
        Regresar al Dashboard
      </button>
    </div>
  );
}

export default GestionClientes;
