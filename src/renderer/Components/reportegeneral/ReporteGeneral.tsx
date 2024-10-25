import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReporteGeneral.css';
import { getReporteGeneral, ReporteData } from './api'; // Ajusta la ruta según sea necesario
import * as XLSX from 'xlsx';  // Importamos la biblioteca xlsx

function ReporteGeneral() {
  const [reporteData, setReporteData] = useState<ReporteData[]>([]);
  const [totals, setTotals] = useState<Partial<ReporteData>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReporte = async () => {
      try {
        const data = await getReporteGeneral();
        setReporteData(data);
        calculateTotals(data);
      } catch (error) {
        console.error('Error fetching reporte general:', error);
        setError('Error al obtener el reporte general.');
      } finally {
        setLoading(false);
      }
    };

    fetchReporte();
  }, []);

  const calculateTotals = (data: ReporteData[]) => {
    const totals: Partial<ReporteData> = {
      gerente: 'TOTALES',
      supervisor: '',
      titular: '',
      ruta: '',
      grupo: '',
      cobranza_ideal: 0,
      cobranza_real: 0,
      prestamo_papel: 0,
      prestamo_real: 0,
      numero_de_creditos: 0,
      numero_de_prestamos: 0,
      morosidad_monto: 0,
      morosidad_porcentaje: null,
      porcentaje_prestamo: null,
      sobrante: 0,
    };

    data.forEach((row) => {
      totals.cobranza_ideal! += row.cobranza_ideal || 0;
      totals.cobranza_real! += row.cobranza_real || 0;
      totals.prestamo_papel! += row.prestamo_papel || 0;
      totals.prestamo_real! += row.prestamo_real || 0;
      totals.numero_de_creditos! += row.numero_de_creditos || 0;
      totals.numero_de_prestamos! += row.numero_de_prestamos || 0;
      totals.morosidad_monto! += row.morosidad_monto || 0;
      totals.sobrante! += row.sobrante || 0;
    });

    if (totals.cobranza_ideal! !== 0) {
      totals.morosidad_porcentaje = totals.morosidad_monto! / totals.cobranza_ideal!;
    } else {
      totals.morosidad_porcentaje = null;
    }

    if (totals.prestamo_real! !== 0) {
      totals.porcentaje_prestamo = totals.cobranza_real! / totals.prestamo_real!;
    } else {
      totals.porcentaje_prestamo = null;
    }

    setTotals(totals);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(reporteData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reporte General');
    XLSX.writeFile(wb, 'ReporteGeneral.xlsx');
  };

  if (loading) {
    return <div>Cargando reporte...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="reporte-general-container">
      <h1>Reporte General</h1>

      {/* Botón para exportar a Excel */}
      <button onClick={exportToExcel} className="export-button">Exportar a Excel</button>

      <table className="reporte-table">
        <thead>
          <tr>
            <th>GERENTE</th>
            <th>SUPERVISOR</th>
            <th>TITULAR</th>
            <th>RUTA</th>
            <th>GRUPO</th>
            <th>COB IDEAL</th>
            <th>COB REAL</th>
            <th>PRESTAMO REAL</th>
            <th>PRESTAMO PAPEL</th>
            <th>NUMERO DE CREDITOS (TOTAL)</th>
            <th>NUMERO DE PRESTAMOS (SEMANAL)</th>
            <th>MOROSIDAD $$$</th>
            <th>MOROSIDAD %</th>
            <th>BONO</th>
            <th>% PRESTAMO</th>
            <th>SOBRANTE</th>
          </tr>
        </thead>
        <tbody>
          {reporteData.map((row, index) => (
            <tr
              key={index}
              className="clickable-row"
              onClick={() => navigate(`/detalle-grupo/${row.grupo_id}`)}
            >
              <td>{row.gerente || 'N/A'}</td>
              <td>{row.supervisor || 'N/A'}</td>
              <td>{row.titular || 'N/A'}</td>
              <td>{row.ruta || 'N/A'}</td>
              <td>{row.grupo || 'N/A'}</td>
              <td>{row.cobranza_ideal !== null ? row.cobranza_ideal.toFixed(2) : '0.00'}</td>
              <td>{row.cobranza_real !== null ? row.cobranza_real.toFixed(2) : '0.00'}</td>
              <td>{row.prestamo_papel !== null ? row.prestamo_papel.toFixed(2) : '0.00'}</td>
              <td>{row.prestamo_real !== null ? row.prestamo_real.toFixed(2) : '0.00'}</td>
              <td>{row.numero_de_creditos !== null ? row.numero_de_creditos : '0'}</td>
              <td>{row.numero_de_prestamos !== null ? row.numero_de_prestamos : '0'}</td>
              <td>{row.morosidad_monto !== null ? row.morosidad_monto.toFixed(2) : '0.00'}</td>
              <td>
                {row.morosidad_porcentaje !== null
                  ? `${(row.morosidad_porcentaje * 100).toFixed(2)}%`
                  : 'N/A'}
              </td>
              <td>{/* BONO calculation here, if applicable */}</td>
              <td>
                {row.porcentaje_prestamo !== null
                  ? `${(row.porcentaje_prestamo * 100).toFixed(2)}%`
                  : 'N/A'}
              </td>
              <td>{row.sobrante !== null ? row.sobrante.toFixed(2) : '0.00'}</td>
            </tr>
          ))}
          {reporteData.length > 0 && (
            <tr>
              <td>{totals.gerente || 'N/A'}</td>
              <td>{totals.supervisor || ''}</td>
              <td>{totals.titular || ''}</td>
              <td>{totals.ruta || ''}</td>
              <td>{totals.grupo || ''}</td>
              <td>{totals.cobranza_ideal !== null ? totals.cobranza_ideal.toFixed(2) : '0.00'}</td>
              <td>{totals.cobranza_real !== null ? totals.cobranza_real.toFixed(2) : '0.00'}</td>
              <td>{totals.prestamo_papel !== null ? totals.prestamo_papel.toFixed(2) : '0.00'}</td>
              <td>{totals.prestamo_real !== null ? totals.prestamo_real.toFixed(2) : '0.00'}</td>
              <td>{totals.numero_de_creditos !== null ? totals.numero_de_creditos : '0'}</td>
              <td>{totals.numero_de_prestamos !== null ? totals.numero_de_prestamos : '0'}</td>
              <td>
                {totals.morosidad_monto !== null ? totals.morosidad_monto.toFixed(2) : '0.00'}
              </td>
              <td>
                {totals.morosidad_porcentaje !== null
                  ? `${(totals.morosidad_porcentaje * 100).toFixed(2)}%`
                  : 'N/A'}
              </td>
              <td>{/* BONO total calculation */}</td>
              <td>
                {totals.porcentaje_prestamo !== null
                  ? `${(totals.porcentaje_prestamo * 100).toFixed(2)}%`
                  : 'N/A'}
              </td>
              <td>{totals.sobrante !== null ? totals.sobrante.toFixed(2) : '0.00'}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ReporteGeneral;
