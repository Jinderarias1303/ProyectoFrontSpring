import { useState } from 'react';
import '../styles/Pedidos.css';
import Navbar from '../components/Navbar';

function Pedidos() {
  const [showForm, setShowForm] = useState(false);
  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      cliente: 'Distribuidora del Norte',
      fecha: '2024-03-15',
      productos: [
        { tipo: 'Atún en agua', cantidad: 500, precio: 2.50 },
        { tipo: 'Atún en aceite', cantidad: 300, precio: 2.80 }
      ],
      total: 2090,
      estado: 'pendiente',
      fechaEntrega: '2024-03-20'
    },
    {
      id: 2,
      cliente: 'Supermercado Central',
      fecha: '2024-03-14',
      productos: [
        { tipo: 'Atún en salsa', cantidad: 200, precio: 3.00 }
      ],
      total: 600,
      estado: 'en_proceso',
      fechaEntrega: '2024-03-18'
    }
  ]);

  const [nuevoPedido, setNuevoPedido] = useState({
    cliente: '',
    fecha: new Date().toISOString().split('T')[0],
    productos: [{ tipo: '', cantidad: '', precio: '' }],
    estado: 'pendiente',
    fechaEntrega: ''
  });

  const [filtros, setFiltros] = useState({
    cliente: '',
    estado: '',
    fechaInicio: '',
    fechaFin: ''
  });

  const handleNuevoPedidoChange = (e) => {
    const { name, value } = e.target;
    setNuevoPedido(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductoChange = (index, field, value) => {
    const nuevosProductos = [...nuevoPedido.productos];
    nuevosProductos[index] = {
      ...nuevosProductos[index],
      [field]: value
    };
    setNuevoPedido(prev => ({
      ...prev,
      productos: nuevosProductos
    }));
  };

  const agregarProducto = () => {
    setNuevoPedido(prev => ({
      ...prev,
      productos: [...prev.productos, { tipo: '', cantidad: '', precio: '' }]
    }));
  };

  const eliminarProducto = (index) => {
    setNuevoPedido(prev => ({
      ...prev,
      productos: prev.productos.filter((_, i) => i !== index)
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calcularTotal = (productos) => {
    return productos.reduce((total, producto) => {
      return total + (producto.cantidad * producto.precio);
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = calcularTotal(nuevoPedido.productos);
    const nuevoPedidoConId = {
      ...nuevoPedido,
      id: pedidos.length + 1,
      total
    };
    setPedidos(prev => [...prev, nuevoPedidoConId]);
    setNuevoPedido({
      cliente: '',
      fecha: new Date().toISOString().split('T')[0],
      productos: [{ tipo: '', cantidad: '', precio: '' }],
      estado: 'pendiente',
      fechaEntrega: ''
    });
    setShowForm(false);
  };

  const filtrarPedidos = () => {
    return pedidos.filter(pedido => {
      const cumpleCliente = !filtros.cliente || 
        pedido.cliente.toLowerCase().includes(filtros.cliente.toLowerCase());
      const cumpleEstado = !filtros.estado || pedido.estado === filtros.estado;
      const cumpleFechaInicio = !filtros.fechaInicio || pedido.fecha >= filtros.fechaInicio;
      const cumpleFechaFin = !filtros.fechaFin || pedido.fecha <= filtros.fechaFin;
      
      return cumpleCliente && cumpleEstado && cumpleFechaInicio && cumpleFechaFin;
    });
  };

  return (
    <div className="pedidos">
      <Navbar />
      <div className="pedidos-header">
        <h1>Gestión de Pedidos</h1>
        <button className="button" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Nuevo Pedido'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h2>Registrar Nuevo Pedido</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="cliente">Cliente</label>
              <input
                type="text"
                id="cliente"
                name="cliente"
                value={nuevoPedido.cliente}
                onChange={handleNuevoPedidoChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="fecha">Fecha del Pedido</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={nuevoPedido.fecha}
                onChange={handleNuevoPedidoChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="fechaEntrega">Fecha de Entrega</label>
              <input
                type="date"
                id="fechaEntrega"
                name="fechaEntrega"
                value={nuevoPedido.fechaEntrega}
                onChange={handleNuevoPedidoChange}
                required
              />
            </div>

            <div className="productos-section">
              <h3>Productos</h3>
              {nuevoPedido.productos.map((producto, index) => (
                <div key={index} className="producto-row">
                  <div className="form-group">
                    <label>Tipo de Producto</label>
                    <select
                      value={producto.tipo}
                      onChange={(e) => handleProductoChange(index, 'tipo', e.target.value)}
                      required
                    >
                      <option value="">Seleccione un tipo</option>
                      <option value="Atún en agua">Atún en agua</option>
                      <option value="Atún en aceite">Atún en aceite</option>
                      <option value="Atún en salsa">Atún en salsa</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Cantidad</label>
                    <input
                      type="number"
                      value={producto.cantidad}
                      onChange={(e) => handleProductoChange(index, 'cantidad', e.target.value)}
                      min="1"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Precio Unitario</label>
                    <input
                      type="number"
                      value={producto.precio}
                      onChange={(e) => handleProductoChange(index, 'precio', e.target.value)}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  {index > 0 && (
                    <button
                      type="button"
                      className="button button-danger"
                      onClick={() => eliminarProducto(index)}
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="button button-secondary"
                onClick={agregarProducto}
              >
                Agregar Producto
              </button>
            </div>

            <button type="submit" className="button">Registrar Pedido</button>
          </form>
        </div>
      )}

      <div className="filtros-card">
        <h2>Filtros</h2>
        <div className="filtros-grid">
          <div className="form-group">
            <label htmlFor="filtroCliente">Cliente</label>
            <input
              type="text"
              id="filtroCliente"
              name="cliente"
              value={filtros.cliente}
              onChange={handleFilterChange}
              placeholder="Buscar por cliente..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="filtroEstado">Estado</label>
            <select
              id="filtroEstado"
              name="estado"
              value={filtros.estado}
              onChange={handleFilterChange}
            >
              <option value="">Todos</option>
              <option value="pendiente">Pendiente</option>
              <option value="en_proceso">En Proceso</option>
              <option value="entregado">Entregado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="fechaInicio">Fecha Inicio</label>
            <input
              type="date"
              id="fechaInicio"
              name="fechaInicio"
              value={filtros.fechaInicio}
              onChange={handleFilterChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="fechaFin">Fecha Fin</label>
            <input
              type="date"
              id="fechaFin"
              name="fechaFin"
              value={filtros.fechaFin}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>

      <div className="table-card">
        <h2>Lista de Pedidos</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Productos</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Fecha Entrega</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrarPedidos().map(pedido => (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{pedido.cliente}</td>
                  <td>{pedido.fecha}</td>
                  <td>
                    <ul className="productos-lista">
                      {pedido.productos.map((producto, index) => (
                        <li key={index}>
                          {producto.cantidad} x {producto.tipo}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>${pedido.total.toFixed(2)}</td>
                  <td>
                    <span className={`status ${pedido.estado}`}>
                      {pedido.estado.replace('_', ' ').charAt(0).toUpperCase() + 
                       pedido.estado.slice(1).replace('_', ' ')}
                    </span>
                  </td>
                  <td>{pedido.fechaEntrega}</td>
                  <td>
                    <button className="button button-small">Editar</button>
                    <button className="button button-small button-danger">Eliminar</button>
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

export default Pedidos; 