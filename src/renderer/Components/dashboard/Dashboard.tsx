import React from 'react';
import Menu from '../menu/Menu';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

function Dashboard() {
  const { logout } = useAuth();

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <Menu />
      <button type="button" className="logout-button" onClick={logout}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Dashboard;
