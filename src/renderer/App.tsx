import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/login/Login';
import Dashboard from './Components/dashboard/Dashboard';
import AltaCliente from './Components/altacliente/AltaCliente';
import Home from './Components/home/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/alta-cliente" element={<AltaCliente />} />
      </Routes>
    </Router>
  );
}

export default App;
