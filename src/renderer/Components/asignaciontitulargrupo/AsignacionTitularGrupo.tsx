import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../utils/apiClient';
import './AsignacionTitularGrupo.css';

function AsignacionTitularGrupo() {
  const [usuarios, setUsuarios] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [selectedUsuario, setSelectedUsuario] = useState('');
  const [selectedGrupo, setSelectedGrupo] = useState('');
  const navigate = useNavigate();

  // Obtener lista de usuarios de tipo 'titular'
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await apiClient.get('/users/tipo-especifico?rol=Titular');
        setUsuarios(response.data.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    const fetchGrupos = async () => {
      try {
        const response = await apiClient.get('/grupos/');
        setGrupos(response.data.data); // Asegurarse de acceder a la clave 'data'
      } catch (error) {
        console.error('Error al obtener grupos:', error);
      }
    };

    fetchUsuarios();
    fetchGrupos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const asignacion = {
      usuario_id_titular: selectedUsuario, // El nuevo titular a asignar (debe ser el ID del usuario)
    };

    try {
      const response = await apiClient.put(`/grupos/${selectedGrupo}`, asignacion);
      if (response.status === 200) {
        console.log('Grupo actualizado:', response.data);
        navigate('/dashboard');
      } else {
        console.error('Error al actualizar grupo');
      }
    } catch (error) {
      console.error('Error al actualizar grupo:', error);
    }
  };

  return (
    <div className="asignacion-titular-grupo-container">
      <form onSubmit={handleSubmit} className="asignacion-titular-grupo-form">
        <h1>Reasignación de Titular a Grupo</h1>

        {/* Selección de Titular */}
        <select
          value={selectedUsuario}
          onChange={(e) => setSelectedUsuario(e.target.value)}
          required
        >
          <option value="">Seleccione un Titular</option>
          {usuarios.map((usuario) => (
            <option key={usuario.userId} value={usuario.userId}>
              {usuario.nombre} {usuario.apellido_paterno} {usuario.apellido_materno}
            </option>
          ))}
        </select>

        {/* Selección de Grupo */}
        <select value={selectedGrupo} onChange={(e) => setSelectedGrupo(e.target.value)} required>
          <option value="">Seleccione un Grupo</option>
          {grupos.map((grupo) => (
            <option key={grupo.grupo_id} value={grupo.grupo_id}>
              {grupo.nombre_grupo}
            </option>
          ))}
        </select>

        <button type="submit">Asignar Titular</button>
      </form>

      <button type="button" onClick={() => navigate('/dashboard')} className="back-button">
        Regresar al Dashboard
      </button>
    </div>
  );
}

export default AsignacionTitularGrupo;
