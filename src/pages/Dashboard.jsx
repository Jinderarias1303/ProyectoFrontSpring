import { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import Navbar from '../components/Navbar';

function Dashboard() {
  const [stats, setStats] = useState({
    totalPedidos: 0,
    pedidosPendientes: 0,
    totalProduccion: 0,
    lotesDefectuosos: 0,
    clientesActivos: 0,
    ventasTotales: 0
  });

  // Simulación de datos - Esto se reemplazará con datos reales del backend
  useEffect(() => {
    // Aquí irá la llamada a la API
    setStats({
      totalPedidos: 150,
      pedidosPendientes: 25,
      totalProduccion: 5000,
      lotesDefectuosos: 3,
      clientesActivos: 45,
      ventasTotales: 75000
    });
  }, []);

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-header">
        <h1>Inicio</h1>
        <p>Bienvenido al sistema de gestión de Atunes del Pacífico S.A.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>Total Pedidos</h3>
            <p className="stat-value">{stats.totalPedidos}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>Pedidos Pendientes</h3>
            <p className="stat-value">{stats.pedidosPendientes}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏭</div>
          <div className="stat-info">
            <h3>Producción Total</h3>
            <p className="stat-value">{stats.totalProduccion} unidades</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚠️</div>
          <div className="stat-info">
            <h3>Lotes Defectuosos</h3>
            <p className="stat-value">{stats.lotesDefectuosos}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>Clientes Activos</h3>
            <p className="stat-value">{stats.clientesActivos}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Ventas Totales</h3>
            <p className="stat-value">${stats.ventasTotales.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section-card">
          <h2>Últimos Pedidos</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#001</td>
                  <td>Cliente A</td>
                  <td>2024-03-20</td>
                  <td><span className="status pending">Pendiente</span></td>
                  <td>$1,500</td>
                </tr>
                <tr>
                  <td>#002</td>
                  <td>Cliente B</td>
                  <td>2024-03-19</td>
                  <td><span className="status completed">Completado</span></td>
                  <td>$2,300</td>
                </tr>
                <tr>
                  <td>#003</td>
                  <td>Cliente C</td>
                  <td>2024-03-18</td>
                  <td><span className="status processing">En Proceso</span></td>
                  <td>$950</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="section-card">
          <h2>Producción Reciente</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Lote</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>L-001</td>
                  <td>Atún en Aceite</td>
                  <td>1000</td>
                  <td>2024-03-20</td>
                  <td><span className="status completed">Completado</span></td>
                </tr>
                <tr>
                  <td>L-002</td>
                  <td>Atún en Agua</td>
                  <td>800</td>
                  <td>2024-03-19</td>
                  <td><span className="status processing">En Proceso</span></td>
                </tr>
                <tr>
                  <td>L-003</td>
                  <td>Atún en Salsa</td>
                  <td>1200</td>
                  <td>2024-03-18</td>
                  <td><span className="status completed">Completado</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 