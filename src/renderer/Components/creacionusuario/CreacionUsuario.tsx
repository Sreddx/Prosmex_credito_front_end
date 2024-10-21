import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRoles, registerUser } from './api'; // Importar funciones de la API
import './CreacionUsuario.css';

interface Rol {
  id: number;
  nombre: string;
}

function CreacionUsuario() {
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState<Rol[]>([]);
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const cargarRoles = async () => {
      try {
        const roles = await fetchRoles();
        setRoles(roles);
      } catch (error) {
        console.error('Error al cargar los roles:', error);
      }
    };

    cargarRoles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const nuevoUsuario = {
      nombre,
      apellido_paterno: apellidoPaterno,
      apellido_materno: apellidoMaterno,
      rol_id: role,
      usuario,
      contrasena: password,
    };

    try {
      const response = await registerUser(nuevoUsuario);
      if (response.status === 201) {
        console.log('Usuario creado:', response.data);
        navigate('/dashboard');
      } else {
        console.error('Error al crear usuario');
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  return (
    <div className="creacion-usuario-form-container">
      <form onSubmit={handleSubmit} className="creacion-usuario-form">
        <h1>Creación de Usuario</h1>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Apellido Paterno"
          value={apellidoPaterno}
          onChange={(e) => setApellidoPaterno(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Apellido Materno"
          value={apellidoMaterno}
          onChange={(e) => setApellidoMaterno(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">Seleccione un rol</option>
          {roles.map((rol) => (
            <option key={rol.id} value={rol.id}>
              {rol.nombre}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Crear Usuario</button>
      </form>
      <button type="button" onClick={() => navigate('/dashboard')} className="back-button">
        Regresar al Dashboard
      </button>
    </div>
  );
}

export default CreacionUsuario;
