import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ListarPrestamos from '@Components/listarprestamos/ListarPrestamos';
import Login from './Components/login/Login';
import Dashboard from './Components/dashboard/Dashboard';
import AltaCliente from './Components/altacliente/AltaCliente';
import GestionClientes from './Components/gestionclientes/GestionClientes';
import GestionPrestamos from './Components/gestionprestamos/GestionPrestamos';
import Pagos from './Components/pagos/Pagos';
import Corte from './Components/corte/Corte';
import CreacionUsuario from './Components/creacionusuario/CreacionUsuario';
import BajaUsuario from './Components/bajausuario/BajaUsuario';
import BajaPrestamo from './Components/bajaprestamo/BajaPrestamo';
import AsignacionTitularGrupo from './Components/asignaciontitulargrupo/AsignacionTitularGrupo';
import AsignacionGrupoRuta from './Components/asignaciongruporuta/AsignacionGrupoRuta';
import DetalleGrupo from './Components/detallegrupo/DetalleGrupo'; // Importa el componente DetalleGrupo
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
            path="/listar-prestamos"
            element={
              <ProtectedRoute requiredPermissions={[2]}>
                <ListarPrestamos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pagos"
            element={
              <ProtectedRoute requiredPermissions={[2]}>
                <Pagos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/corte"
            element={
              <ProtectedRoute requiredPermissions={[1]}>
                <Corte />
              </ProtectedRoute>
            }
          />
          <Route
            path="/creacion-usuario"
            element={
              <ProtectedRoute requiredPermissions={[3]}>
                <CreacionUsuario />
              </ProtectedRoute>
            }
          />
          <Route
            path="/baja-usuario"
            element={
              <ProtectedRoute requiredPermissions={[3]}>
                <BajaUsuario />
              </ProtectedRoute>
            }
          />
          <Route
            path="/baja-prestamo"
            element={
              <ProtectedRoute requiredPermissions={[2]}>
                <BajaPrestamo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/asignacion-titular-grupo"
            element={
              <ProtectedRoute requiredPermissions={[3]}>
                <AsignacionTitularGrupo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/asignacion-grupo-ruta"
            element={
              <ProtectedRoute requiredPermissions={[3]}>
                <AsignacionGrupoRuta />
              </ProtectedRoute>
            }
          />
          <Route
            path="/detalle-grupo/:grupo_id"
            element={
              <ProtectedRoute requiredPermissions={[1, 2, 3]}>
                <DetalleGrupo />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
