import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listClientes, updateCliente } from './Api'; // Ajusta la ruta según tu estructura
import { Cliente } from '../../types';
import './GestionClientes.css';
import ModalAlertas from '../modalAlertas/ModalAlertas'; // Importa ModalAlertas para mostrar mensajes de confirmación

function GestionClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [clientesEditados, setClientesEditados] = useState<Cliente[]>([]);
  const [modalMessage, setModalMessage] = useState<string>('');  // Estado para el mensaje del modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);  // Estado para controlar la visibilidad del modal
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

  // Función para manejar cambios en el campo "Es Aval"
  const handleEsAvalChange = (id: number, esAval: boolean) => {
    const nuevosClientes = clientes.map((cliente) => 
      cliente.id === id ? { ...cliente, es_aval: esAval } : cliente
    );
    setClientes(nuevosClientes);

    // Mantener una lista de clientes editados
    const clienteEditado = nuevosClientes.find(cliente => cliente.id === id);
    if (clienteEditado && !clientesEditados.some(c => c.id === id)) {
      setClientesEditados([...clientesEditados, clienteEditado]);
    }
  };

  // Función para guardar los cambios
  const handleGuardarCambios = async () => {
    try {
      for (const cliente of clientesEditados) {
        await updateCliente(cliente.id, { es_aval: cliente.es_aval });
      }
      setClientesEditados([]); // Limpiar la lista de clientes editados después de guardar
      setModalMessage('Cambios guardados con éxito');
      setIsModalOpen(true);  // Mostrar el modal de éxito

      // Cerrar el modal y redirigir después de 2 segundos
      setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      setModalMessage('Hubo un error al guardar los cambios.');
      setIsModalOpen(true);  // Mostrar el modal de error
    }
  };

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
              <td>
                <select
                  value={cliente.es_aval ? 'Sí' : 'No'}
                  onChange={(e) =>
                    handleEsAvalChange(cliente.id, e.target.value === 'Sí')
                  }
                >
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
              </td>
              <td>{cliente.grupo_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <button className="save-button" onClick={handleGuardarCambios}>
        Guardar cambios
      </button>
      
      <button type="button" onClick={() => navigate('/dashboard')} className="back-button">
        Regresar al Dashboard
      </button>

      {/* Modal de confirmación */}
      <ModalAlertas
        message={modalMessage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default GestionClientes;
