import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReporteGeneral.css';
import * as XLSX from 'xlsx';
import { getReporteGeneral, getTotales, ReporteData, TotalesData } from './api';
import { useAuth } from '../../context/AuthContext';

function ReporteGeneral() {
  const { user } = useAuth();
  const [reporteData, setReporteData] = useState<ReporteData[]>([]);
  const [totals, setTotals] = useState<TotalesData | null>(null);
  const [loadingReporte, setLoadingReporte] = useState<boolean>(true);
  const [loadingTotales, setLoadingTotales] = useState<boolean>(true);
  const [errorReporte, setErrorReporte] = useState<string>('');
  const [errorTotales, setErrorTotales] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const navigate = useNavigate();

  const formatCurrency = (value: number | undefined) => {
    return value !== undefined
      ? new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value)
      : 'N/A';
  };

  useEffect(() => {
    const fetchReporte = async () => {
      setLoadingReporte(true);
      setErrorReporte('');
      try {
        const {
          reporte,
          page: responsePage,
          per_page,
          total_items,
        } = await getReporteGeneral(page, perPage);
        setReporteData(reporte);
        setPage(responsePage);
        setTotalItems(total_items);
      } catch (error) {
        console.error('Error fetching reporte general:', error);
        setErrorReporte('Error al obtener el reporte general.');
      } finally {
        setLoadingReporte(false);
      }
    };

    fetchReporte();
  }, [page, perPage]);

  useEffect(() => {
    const fetchTotales = async () => {
      setLoadingTotales(true);
      setErrorTotales('');
      try {
        const data = await getTotales();
        setTotals(data);
      } catch (error) {
        console.error('Error fetching totales:', error);
        setErrorTotales('Error al obtener los totales.');
      } finally {
        setLoadingTotales(false);
      }
    };

    fetchTotales();
  }, []);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(reporteData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reporte General');
    XLSX.writeFile(wb, 'ReporteGeneral.xlsx');
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loadingReporte || loadingTotales) {
    return <div className="loading">Cargando reporte y totales...</div>;
  }

  if (errorReporte) {
    return <div>{errorReporte}</div>;
  }

  return (
    <div className="reporte-general-container">
      <h1>Reporte General</h1>
      {user?.rol_id === 6 && (
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
            <th>NUMERO DE CREDITOS (TOTAL)</th>
            <th>NUMERO DE PRESTAMOS (SEMANA)</th>
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
              <td>{row.prestamos_activos || '0'}</td>
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
          {totals && (
            <tr className="totals-row">
              <td>TOTALES</td>
              <td colSpan={4} />
              <td>{formatCurrency(totals.total_cobranza_ideal)}</td>
              <td>{formatCurrency(totals.total_cobranza_real)}</td>
              <td>{formatCurrency(parseFloat(totals.total_prestamo_papel))}</td>
              <td>{formatCurrency(parseFloat(totals.total_prestamo_real))}</td>
              <td>{totals.total_numero_de_creditos}</td>
              <td>{totals.total_prestamos_activos}</td>
              <td>{formatCurrency(totals.morosidad_monto)}</td>
              <td>
                {totals.morosidad_porcentaje !== null
                  ? `${totals.morosidad_porcentaje.toFixed(2)}%`
                  : 'N/A'}
              </td>
              <td>{formatCurrency(totals.total_bono)}</td>
              <td>
                {totals.porcentaje_prestamo !== null ? `${totals.porcentaje_prestamo}%` : 'N/A'}
              </td>
              <td>{formatCurrency(parseFloat(totals.sobrante))}</td>
            </tr>
                )}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
          Anterior
        </button>
        <span>
          Página {page} de {Math.ceil(totalItems / perPage)}
        </span>
        <button
          disabled={page === Math.ceil(totalItems / perPage)}
          onClick={() => handlePageChange(page + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default ReporteGeneral;
