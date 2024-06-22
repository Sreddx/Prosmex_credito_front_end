import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <Link to="/alta-cliente" className="dashboard-link">
        Alta Cliente
      </Link>
      <Link to="/gestion-clientes" className="dashboard-link">
        Gestión de Clientes
      </Link>
      <Link to="/gestion-prestamos" className="dashboard-link">
        Gestión de Préstamos
      </Link>
      {/* Agregar más enlaces según sea necesario */}
    </div>
  );
}

export default Dashboard;
