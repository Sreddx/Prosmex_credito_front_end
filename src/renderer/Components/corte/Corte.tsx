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
  const [semilla, setSemilla] = useState<number | ''>(0);
  const sobranteCobranza = -5900.00; // Monto sobrante de cobranza como ejemplo
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

  const calcularTotalGastos = () => {
    return conceptos.reduce((total, concepto) => total + concepto.monto, 0);
  };

  const calcularCorteTotal = () => {
    const totalGastos = calcularTotalGastos();
    const totalSemilla = Number(semilla) || 0;
    return sobranteCobranza - totalGastos + totalSemilla;
  };

  return (
    <div className="corte-container">
      <h1>Corte de Gastos</h1>

      {/* Tabla de conceptos */}
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

      {/* Botón para agregar concepto */}
      <button className="add-button" onClick={handleAgregarConcepto}>
        Agregar Concepto
      </button>

      {/* Sobrante de cobranza */}
      <div className="sobrante-cobranza">
        <strong>Sobrante de Cobranza:</strong> ${sobranteCobranza.toFixed(2)}
      </div>

      {/* Total de gastos */}
      <div className="corte-total">
        <strong>Total Gastos:</strong> ${calcularTotalGastos().toFixed(2)}
      </div>

      {/* Input para ingresar el monto semilla */}
      <div className="semilla-input">
        <label htmlFor="semilla">
          <strong>Monto Semilla:</strong>
        </label>
        <input
          id="semilla"
          type="number"
          placeholder="Ingresa monto semilla"
          value={semilla}
          onChange={(e) => setSemilla(Number(e.target.value))}
        />
      </div>

      {/* Corte total */}
      <div className="corte-final-total">
        <strong>Corte Total:</strong> ${calcularCorteTotal().toFixed(2)}
      </div>

      {/* Botón para regresar al Dashboard */}
      <button className="back-button" onClick={() => navigate('/dashboard')}>
        Regresar al Dashboard
      </button>
    </div>
  );
}

export default Corte;
