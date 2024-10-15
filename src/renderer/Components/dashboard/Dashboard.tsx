// Dashboard.tsx

import React from 'react';
import Menu from '../menu/Menu';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';
import ReporteGeneral from '../reportegeneral/ReporteGeneral'; // Adjust the path accordingly

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
        <ReporteGeneral />
      </main>
    </div>
  );
}

export default Dashboard;
