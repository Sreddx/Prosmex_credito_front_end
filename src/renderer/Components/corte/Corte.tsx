import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Corte.css';
import { getDatosCorte, createCorte, CorteData } from './api';
import ModalAlertas from '../modalAlertas/ModalAlertas';

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
  const [bono, setBono] = useState<number>(0);
  const [montoSemilla, setMontoSemilla] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDatosCorte = async () => {
      try {
        const { sobrante_total, bono_global } = await getDatosCorte();
        setSobranteCobranza(sobrante_total);
        setBono(bono_global);
      } catch (error) {
        console.error('Error al obtener los datos de corte:', error);
      }
    };

    fetchDatosCorte();
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

  const handleGuardarCorte = async () => {
    const corteData: CorteData = {
      corte_total: calcularCorteTotal(),
      total_gastos: calcularTotal(),
      semilla: montoSemilla,
    };

    try {
      await createCorte(corteData);
      setModalMessage('Corte guardado con éxito');
      setIsModalOpen(true);

      // Cerrar el modal y redirigir al dashboard después de 2 segundos
      setTimeout(() => {
        setIsModalOpen(false);
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      setModalMessage('Error al guardar el corte');
      setIsModalOpen(true);
    }
  };

  return (
    <div className="corte-container">
      <h1>Corte de Gastos</h1>

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

      <div className="corte-total">
        <strong>Total Gastos:</strong> ${calcularTotal().toFixed(2)}
      </div>

      <div className="sobrante-cobranza">
        <strong>Sobrante de Cobranza:</strong> ${sobranteCobranza.toFixed(2)}
      </div>

      <div className="semilla-input">
        <label>Monto Semilla:</label>
        <input
          type="number"
          value={montoSemilla}
          onChange={(e) => setMontoSemilla(Number(e.target.value))}
        />
      </div>

      <div className="corte-final-total">
        <strong>Corte Total:</strong> ${calcularCorteTotal().toFixed(2)}
      </div>

      <button className="guardar-button" onClick={handleGuardarCorte}>
        Guardar Corte
      </button>

      <button className="back-button" onClick={() => navigate('/dashboard')}>
        Regresar al Dashboard
      </button>

      <ModalAlertas message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Corte;
