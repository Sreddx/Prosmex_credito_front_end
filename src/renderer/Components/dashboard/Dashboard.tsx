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
        <h1>Reporte General</h1>
        <table className="data-table">
          <thead>
            <tr>
              <th>GERENTE</th>
              <th>SUPERVISOR</th>
              <th>TITULAR</th>
              <th>RUTA</th>
              <th>GRUPO</th>
              <th>COB IDEAL</th>
              <th>COB REAL</th>
              <th>PRESTAMO PAPEL</th>
              <th>PRESTAMO REAL</th>
              <th>MOROSIDAD $$$</th>
              <th>MOROSIDAD %</th>
              <th>% PRESTAMO</th>
              <th>SOBRANTE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GERENTE</td>
              <td>SUPERVISOR</td>
              <td>TITULAR</td>
              <td>RUTA</td>
              <td>GRUPO 1</td>
              <td>$2000.0</td>
              <td>$2000.0</td>
              <td>$5000.0</td>
              <td>$4000.0</td>
              <td>$0.0</td>
              <td>0.0</td>
              <td>2.0</td>
              <td>-2000.0</td>
            </tr>
            <tr>
              <td>GERENTE</td>
              <td>SUPERVISOR</td>
              <td>TITULAR</td>
              <td>RUTA</td>
              <td>GRUPO 2</td>
              <td>$2500.0</td>
              <td>$2300.0</td>
              <td>$8000.0</td>
              <td>$7000.0</td>
              <td>$200.0</td>
              <td>0.08</td>
              <td>3.043478</td>
              <td>-4700.0</td>
            </tr>
            <tr>
              <td>GERENTE</td>
              <td>SUPERVISOR</td>
              <td>TITULAR</td>
              <td>RUTA</td>
              <td>GRUPO 3</td>
              <td>$2000.0</td>
              <td>$1800.0</td>
              <td>$1500.0</td>
              <td>$1000.0</td>
              <td>$200.0</td>
              <td>0.1</td>
              <td>0.555556</td>
              <td>800.0</td>
            </tr>
            <tr>
              <td>TOTALES</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>$6500.0</td>
              <td>$6100.0</td>
              <td>$14500.0</td>
              <td>$12000.0</td>
              <td>$400.0</td>
              <td>0.061538</td>
              <td>0.938462</td>
              <td>-5900.0</td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Dashboard;
