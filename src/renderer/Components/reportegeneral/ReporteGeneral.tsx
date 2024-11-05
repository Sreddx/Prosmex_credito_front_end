import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReporteGeneral.css';
import * as XLSX from 'xlsx';
import { getReporteGeneral, ReporteData } from './api';
import { useAuth } from '../../context/AuthContext'; // Importa el contexto de autenticación con la ruta correcta

function ReporteGeneral() {
  const { user } = useAuth(); // Obtiene el usuario autenticado del contexto
  const [reporteData, setReporteData] = useState<ReporteData[]>([]);
  const [totals, setTotals] = useState<Partial<ReporteData>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const formatCurrency = (value: number | undefined) => {
    return value !== undefined
      ? new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value)
      : 'N/A';
  };

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
      bono: 0,
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
      totals.bono! += row.bono || 0;
    });

    totals.morosidad_porcentaje = totals.cobranza_ideal
      ? totals.morosidad_monto! / totals.cobranza_ideal
      : null;
    totals.porcentaje_prestamo = totals.prestamo_real
      ? totals.cobranza_real! / totals.prestamo_real
      : null;

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
      {user?.rol_id === 6 && ( // Verifica si el usuario tiene el rol de "Admin" (rol_id === 6)
        <button onClick={exportToExcel} className="export-button">
          Exportar a Excel
        </button>
      )}
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
            <th>PRESTAMO PAPEL</th>
            <th>PRESTAMO REAL</th>
            <th>NUMERO DE CREDITOS</th>
            <th>NUMERO DE PRESTAMOS</th>
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
              <td>{formatCurrency(row.cobranza_ideal)}</td>
              <td>{formatCurrency(row.cobranza_real)}</td>
              <td>{formatCurrency(row.prestamo_papel)}</td>
              <td>{formatCurrency(row.prestamo_real)}</td>
              <td>{row.numero_de_creditos || '0'}</td>
              <td>{row.numero_de_prestamos || '0'}</td>
              <td>{formatCurrency(row.morosidad_monto)}</td>
              <td>
                {row.morosidad_porcentaje !== null
                  ? `${(row.morosidad_porcentaje * 100).toFixed(2)}%`
                  : 'N/A'}
              </td>
              <td>{formatCurrency(row.bono)}</td>
              <td>
                {row.porcentaje_prestamo !== null
                  ? `${(row.porcentaje_prestamo * 100).toFixed(2)}%`
                  : 'N/A'}
              </td>
              <td>{formatCurrency(row.sobrante)}</td>
            </tr>
          ))}
          <tr>
            <td>{totals.gerente}</td>
            <td />
            <td />
            <td />
            <td />
            <td>{formatCurrency(totals.cobranza_ideal)}</td>
            <td>{formatCurrency(totals.cobranza_real)}</td>
            <td>{formatCurrency(totals.prestamo_papel)}</td>
            <td>{formatCurrency(totals.prestamo_real)}</td>
            <td>{totals.numero_de_creditos}</td>
            <td>{totals.numero_de_prestamos}</td>
            <td>{formatCurrency(totals.morosidad_monto)}</td>
            <td>
              {totals.morosidad_porcentaje !== null
                ? `${(totals.morosidad_porcentaje * 100).toFixed(2)}%`
                : 'N/A'}
            </td>
            <td>{formatCurrency(totals.bono)}</td>
            <td>
              {totals.porcentaje_prestamo !== null
                ? `${(totals.porcentaje_prestamo * 100).toFixed(2)}%`
                : 'N/A'}
            </td>
            <td>{formatCurrency(totals.sobrante)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ReporteGeneral;
