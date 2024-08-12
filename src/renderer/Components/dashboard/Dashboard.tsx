import React from 'react';
import Menu from '../menu/Menu';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

function Dashboard() {
  const { logout } = useAuth();

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <Menu />
        <button type="button" className="logout-button" onClick={logout}>
          Cerrar Sesión
        </button>
      </aside>
      <main className="content">
        <h1>Dashboard general</h1>
        {/* Aquí puedes incluir la tabla con datos */}
        <table className="data-table">
          <thead>
            <tr>
              <th>Columna 1</th>
              <th>Columna 2</th>
              <th>Columna 3</th>
              <th>Columna 4</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dato 1</td>
              <td>Dato 2</td>
              <td>Dato 3</td>
              <td>Dato 4</td>
            </tr>
            {/* Más filas de datos */}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Dashboard;
