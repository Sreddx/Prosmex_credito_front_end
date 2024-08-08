import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AsignacionGrupoRuta.css';

function AsignacionGrupoRuta() {
  const [grupos, setGrupos] = useState([]);
  const [rutas, setRutas] = useState([]);
  const [selectedGrupo, setSelectedGrupo] = useState('');
  const [selectedRuta, setSelectedRuta] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of Grupos and Rutas from the API
    const fetchGrupos = async () => {
      try {
        const response = await fetch('/api/grupos');
        const data = await response.json();
        setGrupos(data);
      } catch (error) {
        console.error('Error fetching grupos:', error);
      }
    };

    const fetchRutas = async () => {
      try {
        const response = await fetch('/api/rutas');
        const data = await response.json();
        setRutas(data);
      } catch (error) {
        console.error('Error fetching rutas:', error);
      }
    };

    fetchGrupos();
    fetchRutas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const asignacion = {
      grupo_id: selectedGrupo,
      ruta_id: selectedRuta,
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
    <div className="asignacion-grupo-ruta-container">
      <form onSubmit={handleSubmit} className="asignacion-grupo-ruta-form">
        <h1>Asignación de Grupo a Ruta</h1>
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
        <select
          value={selectedRuta}
          onChange={(e) => setSelectedRuta(e.target.value)}
          required
        >
          <option value="">Seleccione una Ruta</option>
          {rutas.map((ruta) => (
            <option key={ruta.ruta_id} value={ruta.ruta_id}>
              {ruta.nombre}
            </option>
          ))}
        </select>
        <button type="submit">Asignar Grupo</button>
      </form>
      <button type="button" onClick={() => navigate('/dashboard')} className="back-button">
        Regresar al Dashboard
      </button>
    </div>
  );
}

export default AsignacionGrupoRuta;
