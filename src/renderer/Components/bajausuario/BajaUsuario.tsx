import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsuarios, deleteUsuario } from './Api'; // Ajusta la ruta según tu estructura
import { User } from '../../types';
import './BajaUsuario.css';
import ModalAlertas from '../modalAlertas/ModalAlertas'; // Importa el modal de alerta

function BajaUsuario() {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState<string>(''); // Estado para el mensaje del modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para controlar el modal
  const navigate = useNavigate();

  // Obtener la lista de usuarios
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await getUsuarios();
        if ('error' in response) {
          setError(response.error);
        } else {
          setUsuarios(response); // Asignar usuarios obtenidos del API
        }
      } catch (err) {
        setError('Error al cargar los usuarios');
      }
    };

    fetchUsuarios();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await deleteUsuario(Number(usuarioSeleccionado));
      setModalMessage('Usuario eliminado con éxito');
      setIsModalOpen(true);

      // Cerrar el modal y redirigir al Dashboard después de 2 segundos
      setTimeout(() => {
        setIsModalOpen(false);
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      setModalMessage('Error al eliminar el usuario');
      setIsModalOpen(true);
    }
  };

  return (
    <div className="baja-usuario-container">
      <form onSubmit={handleSubmit} className="baja-usuario-form">
        <h1>Baja de Usuario</h1>

        {/* Selector para elegir el usuario */}
        <label htmlFor="usuario">Selecciona un usuario:</label>
        <select
          id="usuario"
          value={usuarioSeleccionado}
          onChange={(e) => setUsuarioSeleccionado(e.target.value)}
          required
        >
          <option value="">Selecciona un usuario</option>
          {usuarios.map((usuario) => (
            <option key={usuario.userId} value={usuario.userId}>
              {`${usuario.usuario}: ${usuario.nombre} ${usuario.apellido_paterno} ${usuario.apellido_materno}`}
            </option>
          ))}
        </select>

        <button type="submit" className="delete-button">
          Eliminar Usuario
        </button>
      </form>
      <button type="button" onClick={() => navigate('/dashboard')} className="back-button">
        Regresar al Dashboard
      </button>

      {/* Modal para mensajes de confirmación */}
      <ModalAlertas
        message={modalMessage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default BajaUsuario;
