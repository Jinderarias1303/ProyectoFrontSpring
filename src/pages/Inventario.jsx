import { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Inventario.css';

function Inventario() {
  const [showForm, setShowForm] = useState(false);
  const [inventario, setInventario] = useState([
    {
      id: 1,
      producto: 'Atún en agua',
      lote: 'AT-2024-001',
      cantidad: 1000,
      fecha_ingreso: '2024-03-15',
      fecha_vencimiento: '2025-03-15',
      ubicacion: 'Almacén A',
      estado: 'disponible'
    },
    {
      id: 2,
      producto: 'Atún en aceite',
      lote: 'AT-2024-002',
      cantidad: 800,
      fecha_ingreso: '2024-03-10',
      fecha_vencimiento: '2025-03-10',
      ubicacion: 'Almacén B',
      estado: 'reservado'
    }
  ]);

  const [filtros, setFiltros] = useState({
    producto: '',
    lote: '',
    estado: '',
    ubicacion: ''
  });

  const [nuevoItem, setNuevoItem] = useState({
    producto: '',
    lote: '',
    cantidad: '',
    fecha_ingreso: '',
    fecha_vencimiento: '',
    ubicacion: '',
    estado: 'disponible'
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNuevoItemChange = (e) => {
    const { name, value } = e.target;
    setNuevoItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoId = Math.max(...inventario.map(item => item.id)) + 1;
    setInventario(prev => [...prev, { ...nuevoItem, id: nuevoId }]);
    setNuevoItem({
      producto: '',
      lote: '',
      cantidad: '',
      fecha_ingreso: '',
      fecha_vencimiento: '',
      ubicacion: '',
      estado: 'disponible'
    });
    setShowForm(false);
  };

  const filtrarInventario = () => {
    return inventario.filter(item => {
      return (
        item.producto.toLowerCase().includes(filtros.producto.toLowerCase()) &&
        item.lote.toLowerCase().includes(filtros.lote.toLowerCase()) &&
        (filtros.estado === '' || item.estado === filtros.estado) &&
        (filtros.ubicacion === '' || item.ubicacion === filtros.ubicacion)
      );
    });
  };

  return (
    <div className="inventario">
      <Navbar />
      <div className="inventario-header">
        <h1>Gestión de Inventario</h1>
        <button 
          className="button-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : 'Nuevo Item'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h2>Registrar Nuevo Item</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Producto</label>
              <input
                type="text"
                name="producto"
                value={nuevoItem.producto}
                onChange={handleNuevoItemChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Lote</label>
              <input
                type="text"
                name="lote"
                value={nuevoItem.lote}
                onChange={handleNuevoItemChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Cantidad</label>
              <input
                type="number"
                name="cantidad"
                value={nuevoItem.cantidad}
                onChange={handleNuevoItemChange}
                required
                min="1"
              />
            </div>
            <div className="form-group">
              <label>Fecha de Ingreso</label>
              <input
                type="date"
                name="fecha_ingreso"
                value={nuevoItem.fecha_ingreso}
                onChange={handleNuevoItemChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Fecha de Vencimiento</label>
              <input
                type="date"
                name="fecha_vencimiento"
                value={nuevoItem.fecha_vencimiento}
                onChange={handleNuevoItemChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Ubicación</label>
              <input
                type="text"
                name="ubicacion"
                value={nuevoItem.ubicacion}
                onChange={handleNuevoItemChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Estado</label>
              <select
                name="estado"
                value={nuevoItem.estado}
                onChange={handleNuevoItemChange}
                required
              >
                <option value="disponible">Disponible</option>
                <option value="reservado">Reservado</option>
                <option value="agotado">Agotado</option>
              </select>
            </div>
            <button type="submit" className="button-primary">Registrar Item</button>
          </form>
        </div>
      )}

      <div className="filtros-card">
        <h2>Filtros</h2>
        <div className="filtros-grid">
          <div className="form-group">
            <label>Producto</label>
            <input
              type="text"
              name="producto"
              value={filtros.producto}
              onChange={handleFilterChange}
              placeholder="Buscar por producto..."
            />
          </div>
          <div className="form-group">
            <label>Lote</label>
            <input
              type="text"
              name="lote"
              value={filtros.lote}
              onChange={handleFilterChange}
              placeholder="Buscar por lote..."
            />
          </div>
          <div className="form-group">
            <label>Estado</label>
            <select
              name="estado"
              value={filtros.estado}
              onChange={handleFilterChange}
            >
              <option value="">Todos</option>
              <option value="disponible">Disponible</option>
              <option value="reservado">Reservado</option>
              <option value="agotado">Agotado</option>
            </select>
          </div>
          <div className="form-group">
            <label>Ubicación</label>
            <select
              name="ubicacion"
              value={filtros.ubicacion}
              onChange={handleFilterChange}
            >
              <option value="">Todas</option>
              <option value="Almacén A">Almacén A</option>
              <option value="Almacén B">Almacén B</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-card">
        <h2>Inventario Actual</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Lote</th>
                <th>Cantidad</th>
                <th>Fecha Ingreso</th>
                <th>Fecha Vencimiento</th>
                <th>Ubicación</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrarInventario().map(item => (
                <tr key={item.id}>
                  <td>{item.producto}</td>
                  <td>{item.lote}</td>
                  <td>{item.cantidad}</td>
                  <td>{item.fecha_ingreso}</td>
                  <td>{item.fecha_vencimiento}</td>
                  <td>{item.ubicacion}</td>
                  <td>
                    <span className={`status ${item.estado}`}>
                      {item.estado.charAt(0).toUpperCase() + item.estado.slice(1)}
                    </span>
                  </td>
                  <td>
                    <button className="button-small button-secondary">Editar</button>
                    <button className="button-small button-danger">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Inventario; 