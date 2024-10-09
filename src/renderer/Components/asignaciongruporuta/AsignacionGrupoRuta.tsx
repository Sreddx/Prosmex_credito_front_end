import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../utils/apiClient';
import './AsignacionGrupoRuta.css';

function AsignacionGrupoRuta() {
  const [rutas, setRutas] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [selectedRuta, setSelectedRuta] = useState('');
  const [selectedGrupo, setSelectedGrupo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const response = await apiClient.get('/rutas/');
        setRutas(response.data.data.rutas); // Asegurarse de acceder a 'data.data'
      } catch (error) {
        console.error('Error al obtener rutas:', error);
      }
    };

    const fetchGrupos = async () => {
      try {
        const response = await apiClient.get('/grupos/');
        setGrupos(response.data.data); // Asegurarse de acceder a 'data.data'
      } catch (error) {
        console.error('Error al obtener grupos:', error);
      }
    };

    fetchRutas();
    fetchGrupos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updateData = {
      ruta_id: selectedRuta, // El nuevo ruta_id a asignar
    };

    try {
      // Realizar la solicitud PUT al endpoint para actualizar el grupo
      const response = await apiClient.put(`/grupos/${selectedGrupo}`, updateData);
      if (response.status === 200) {
        console.log('Grupo actualizado con ruta:', response.data);
        navigate('/dashboard');
      } else {
        console.error('Error al actualizar el grupo');
      }
    } catch (error) {
      console.error('Error al actualizar el grupo:', error);
    }
  };

  return (
    <div className="asignacion-grupo-ruta-container">
      <form onSubmit={handleSubmit} className="asignacion-grupo-ruta-form">
        <h1>Asignación de Ruta a Grupo</h1>

        {/* Selección de Grupo */}
        <select value={selectedGrupo} onChange={(e) => setSelectedGrupo(e.target.value)} required>
          <option value="">Seleccione un Grupo</option>
          {grupos.map((grupo) => (
            <option key={grupo.grupo_id} value={grupo.grupo_id}>
              {grupo.nombre_grupo}
            </option>
          ))}
        </select>

        {/* Selección de Ruta */}
        <select value={selectedRuta} onChange={(e) => setSelectedRuta(e.target.value)} required>
          <option value="">Seleccione una Ruta</option>
          {rutas.map((ruta) => (
            <option key={ruta.ruta_id} value={ruta.ruta_id}>
              {ruta.nombre_ruta}
            </option>
          ))}
        </select>

        <button type="submit">Asignar Ruta</button>
      </form>
      <button type="button" onClick={() => navigate('/dashboard')} className="back-button">
        Regresar al Dashboard
      </button>
    </div>
  );
}

export default AsignacionGrupoRuta;
