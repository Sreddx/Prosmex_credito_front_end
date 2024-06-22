import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/login/Login';
import Dashboard from './Components/dashboard/Dashboard';
import AltaCliente from './Components/altacliente/AltaCliente';
import GestionClientes from './Components/gestionclientes/GestionClientes';
import GestionPrestamos from './Components/gestionprestamos/GestionPrestamos';
import ProtectedRoute from './Components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alta-cliente"
            element={
              <ProtectedRoute role="admin">
                <AltaCliente />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gestion-clientes"
            element={
              <ProtectedRoute role="admin">
                <GestionClientes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gestion-prestamos"
            element={
              <ProtectedRoute role="user">
                <GestionPrestamos />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
