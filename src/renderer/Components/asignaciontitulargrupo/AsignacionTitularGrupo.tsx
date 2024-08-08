import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AsignacionTitularGrupo.css';

function AsignacionTitularGrupo() {
  const [usuarios, setUsuarios] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [selectedUsuario, setSelectedUsuario] = useState('');
  const [selectedGrupo, setSelectedGrupo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of Titulares and Grupos from the API
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('/api/usuarios?tipo=titular');
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error('Error fetching usuarios:', error);
      }
    };

    const fetchGrupos = async () => {
      try {
        const response = await fetch('/api/grupos');
        const data = await response.json();
        setGrupos(data);
      } catch (error) {
        console.error('Error fetching grupos:', error);
      }
    };

    fetchUsuarios();
    fetchGrupos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const asignacion = {
      usuario_id: selectedUsuario,
      grupo_id: selectedGrupo,
    };

    try {
      const response = await fetch('/api/asignaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(asignacion),
      });
      if (response.ok) {
        console.log('Asignación creada:', asignacion);
        navigate('/dashboard');
      } else {
        console.error('Error al crear asignación');
      }
    } catch (error) {
      console.error('Error al crear asignación:', error);
    }
  };

  return (
    <div className="asignacion-titular-grupo-container">
      <form onSubmit={handleSubmit} className="asignacion-titular-grupo-form">
        <h1>Asignación de Titular a Grupo</h1>
        <select
          value={selectedUsuario}
          onChange={(e) => setSelectedUsuario(e.target.value)}
          required
        >
          <option value="">Seleccione un Titular</option>
          {usuarios.map((usuario) => (
            <option key={usuario.usuario_id} value={usuario.usuario_id}>
              {usuario.nombre} {usuario.apellido_paterno} {usuario.apellido_materno}
            </option>
          ))}
        </select>
        <select
          value={selectedGrupo}
          onChange={(e) => setSelectedGrupo(e.target.value)}
          required
        >
          <option value="">Seleccione un Grupo</option>
          {grupos.map((grupo) => (
            <option key={grupo.grupo_id} value={grupo.grupo_id}>
              {grupo.nombre}
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
