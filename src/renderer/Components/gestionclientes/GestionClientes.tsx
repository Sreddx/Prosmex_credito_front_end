import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GestionClientes.css';

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

function GestionClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([
    {
      titular_id: '1',
      nombre: 'Juan',
      apellido_paterno: 'Pérez',
      apellido_materno: 'Gómez',
      colonia: 'Centro',
      cp: '12345',
      codigo_ine: 'INE123456789',
      estado_civil: 'casado',
      num_hijos: 2,
      propiedad: 'casa_propia',
      en_uso_aval: true,
      status_vencido: false,
      semilla: 100,
      grupo_id: 'G1',
    },
    {
      titular_id: '2',
      nombre: 'María',
      apellido_paterno: 'López',
      apellido_materno: 'Martínez',
      colonia: 'Norte',
      cp: '54321',
      codigo_ine: 'INE987654321',
      estado_civil: 'soltero',
      num_hijos: 0,
      propiedad: 'rentada',
      en_uso_aval: false,
      status_vencido: true,
      semilla: 200,
      grupo_id: 'G2',
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of clients from the API
    const fetchClientes = async () => {
      try {
        const response = await fetch('/api/clientes');
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error('Error fetching clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  return (
    <div className="gestion-clientes-container">
      <h1>Listado de Clientes</h1>
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
            <th>En Uso Aval</th>
            <th>Status Vencido</th>
            <th>Semilla</th>
            <th>Grupo ID</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.titular_id}>
              <td>{cliente.titular_id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellido_paterno}</td>
              <td>{cliente.apellido_materno}</td>
              <td>{cliente.colonia}</td>
              <td>{cliente.cp}</td>
              <td>{cliente.codigo_ine}</td>
              <td>{cliente.estado_civil}</td>
              <td>{cliente.num_hijos}</td>
              <td>{cliente.propiedad}</td>
              <td>{cliente.en_uso_aval ? 'Sí' : 'No'}</td>
              <td>{cliente.status_vencido ? 'Sí' : 'No'}</td>
              <td>{cliente.semilla}</td>
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
