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
      {/* Añadir más enlaces según sea necesario */}
    </div>
  );
}

export default Dashboard;
