import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Corte.css';

interface Concepto {
  concepto: string;
  monto: number;
  notas?: string;
}

function Corte() {
  const [conceptos, setConceptos] = useState<Concepto[]>([]);
  const [nuevoConcepto, setNuevoConcepto] = useState<string>('');
  const [nuevoMonto, setNuevoMonto] = useState<number | ''>('');
  const [nuevasNotas, setNuevasNotas] = useState<string>('');
  const navigate = useNavigate();

  const handleAgregarConcepto = () => {
    if (nuevoConcepto && nuevoMonto > 0) {
      const nuevo: Concepto = {
        concepto: nuevoConcepto.toUpperCase(),
        monto: Number(nuevoMonto),
        notas: nuevasNotas,
      };
      setConceptos([...conceptos, nuevo]);
      setNuevoConcepto('');
      setNuevoMonto('');
      setNuevasNotas('');
    }
  };

  const calcularTotal = () => {
    return conceptos.reduce((total, concepto) => total + concepto.monto, 0);
  };

  return (
    <div className="corte-container">
      <h1>Corte de Gastos</h1>
      <table className="corte-table">
        <thead>
          <tr>
            <th>CONCEPTO</th>
            <th>MONTO</th>
            <th>NOTAS</th>
          </tr>
        </thead>
        <tbody>
          {conceptos.map((concepto, index) => (
            <tr key={index}>
              <td>{concepto.concepto}</td>
              <td>${concepto.monto.toFixed(2)}</td>
              <td>{concepto.notas || ''}</td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                placeholder="Nuevo concepto"
                value={nuevoConcepto}
                onChange={(e) => setNuevoConcepto(e.target.value)}
                required
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Monto"
                value={nuevoMonto}
                onChange={(e) => setNuevoMonto(Number(e.target.value))}
                required
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Notas"
                value={nuevasNotas}
                onChange={(e) => setNuevasNotas(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button className="add-button" onClick={handleAgregarConcepto}>
        Agregar Concepto
      </button>
      <div className="corte-total">
        <strong>Total Gastos:</strong> ${calcularTotal().toFixed(2)}
      </div>

      <button className="back-button" onClick={() => navigate('/dashboard')}>
        Regresar al Dashboard
      </button>
    </div>
  );
}

export default Corte;
