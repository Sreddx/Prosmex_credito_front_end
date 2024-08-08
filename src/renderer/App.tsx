import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/login/Login';
import Dashboard from './Components/dashboard/Dashboard';
import AltaCliente from './Components/altacliente/AltaCliente';
import GestionClientes from './Components/gestionclientes/GestionClientes';
import GestionPrestamos from './Components/gestionprestamos/GestionPrestamos';
import EdicionClientes from './Components/edicioncliente/EdicionClientes';
import CreacionUsuario from './Components/creacionusuario/CreacionUsuario';
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
              <ProtectedRoute requiredPermissions={[]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alta-cliente"
            element={
              <ProtectedRoute requiredPermissions={[1]}>
                <AltaCliente />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gestion-clientes"
            element={
              <ProtectedRoute requiredPermissions={[1]}>
                <GestionClientes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gestion-prestamos"
            element={
              <ProtectedRoute requiredPermissions={[2]}>
                <GestionPrestamos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editar-cliente/:id"
            element={
              <ProtectedRoute requiredPermissions={[1]}>
                <EdicionClientes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/creacion-usuario"
            element={
              <ProtectedRoute requiredPermissions={[1]}>
                <CreacionUsuario />
              </ProtectedRoute>
            }
          />
          {/* Añadir más rutas protegidas según sea necesario */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
