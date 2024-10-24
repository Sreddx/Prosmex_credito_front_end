import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Corte.css';
import { getGrupos, Grupo } from './api'; // Asegúrate de estar utilizando el mismo archivo api.ts

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
  const [sobranteCobranza, setSobranteCobranza] = useState<number>(0);
  const [montoSemilla, setMontoSemilla] = useState<number>(0);
  const [grupos, setGrupos] = useState<Grupo[]>([]); // Inicializado como arreglo vacío
  const [grupoSeleccionado, setGrupoSeleccionado] = useState<number | ''>('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const data = await getGrupos(); // Llamada al mismo endpoint que en pagos
        setGrupos(data || []); // Asegúrate de que data es un array
      } catch (error) {
        console.error('Error al obtener los grupos:', error);
        setGrupos([]); // Si hay error, inicializa como un arreglo vacío
      }
    };
    fetchGrupos();
  }, []);

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

  const calcularCorteTotal = () => {
    return sobranteCobranza - calcularTotal() + montoSemilla;
  };

  return (
    <div className="corte-container">
      <h1>Corte de Gastos</h1>

      {/* Selector de Grupo */}
      <div className="selector-grupo">
        <label>Selecciona el Grupo:</label>
        <select
          value={grupoSeleccionado}
          onChange={(e) => setGrupoSeleccionado(Number(e.target.value))}
        >
          <option value="">Selecciona un grupo</option>
          {grupos && grupos.map((grupo) => ( // Aseguramos que grupos exista y sea un arreglo
            <option key={grupo.id} value={grupo.id}>
              {grupo.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Tabla de conceptos */}
      <div className="corte-table-container">
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
      </div>

      <button className="add-button" onClick={handleAgregarConcepto}>
        Agregar Concepto
      </button>

      {/* Sobrante de cobranza */}
      <div className="sobrante-cobranza">
        <label>Sobrante de Cobranza:</label>
        <input
          type="number"
          value={sobranteCobranza}
          onChange={(e) => setSobranteCobranza(Number(e.target.value))}
        />
      </div>

      {/* Total Gastos */}
      <div className="corte-total">
        <strong>Total Gastos:</strong> ${calcularTotal().toFixed(2)}
      </div>

      {/* Monto Semilla */}
      <div className="semilla-input">
        <label>Monto Semilla:</label>
        <input
          type="number"
          value={montoSemilla}
          onChange={(e) => setMontoSemilla(Number(e.target.value))}
        />
      </div>

      {/* Corte Total */}
      <div className="corte-final-total">
        <strong>Corte Total:</strong> ${calcularCorteTotal().toFixed(2)}
      </div>

      <button className="back-button" onClick={() => navigate('/dashboard')}>
        Regresar al Dashboard
      </button>
    </div>
  );
}

export default Corte;
