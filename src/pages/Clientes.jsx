import { useState } from 'react';
import '../styles/Clientes.css';
import Navbar from '../components/Navbar';

function Clientes() {
  const [showForm, setShowForm] = useState(false);
  const [clientes, setClientes] = useState([
    {
      id: 1,
      nombre: 'Distribuidora del Norte',
      contacto: 'Juan Pérez',
      telefono: '555-0101',
      email: 'juan@distribuidora.com',
      direccion: 'Av. Principal 123, Ciudad',
      tipo: 'Distribuidor',
      estado: 'activo'
    },
    {
      id: 2,
      nombre: 'Supermercado Central',
      contacto: 'María García',
      telefono: '555-0102',
      email: 'maria@supercentral.com',
      direccion: 'Calle Comercial 456, Ciudad',
      tipo: 'Minorista',
      estado: 'activo'
    }
  ]);

  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '',
    contacto: '',
    telefono: '',
    email: '',
    direccion: '',
    tipo: 'Distribuidor',
    estado: 'activo'
  });

  const [filtros, setFiltros] = useState({
    nombre: '',
    tipo: '',
    estado: ''
  });

  const handleNuevoClienteChange = (e) => {
    const { name, value } = e.target;
    setNuevoCliente(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoClienteConId = {
      ...nuevoCliente,
      id: clientes.length + 1
    };
    setClientes(prev => [...prev, nuevoClienteConId]);
    setNuevoCliente({
      nombre: '',
      contacto: '',
      telefono: '',
      email: '',
      direccion: '',
      tipo: 'Distribuidor',
      estado: 'Inactivo'
    });
    setShowForm(false);
  };

  const filtrarClientes = () => {
    return clientes.filter(cliente => {
      const cumpleNombre = !filtros.nombre || 
        cliente.nombre.toLowerCase().includes(filtros.nombre.toLowerCase());
      const cumpleTipo = !filtros.tipo || cliente.tipo === filtros.tipo;
      const cumpleEstado = !filtros.estado || cliente.estado === filtros.estado;
      
      return cumpleNombre && cumpleTipo && cumpleEstado;
    });
  };

  return (
    <div className="clientes">
      <Navbar />
      <div className="clientes-header">
        <h1>Gestión de Clientes</h1>
        <button className="button" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Nuevo Cliente'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h2>Registrar Nuevo Cliente</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre de la Empresa</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={nuevoCliente.nombre}
                onChange={handleNuevoClienteChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contacto">Persona de Contacto</label>
              <input
                type="text"
                id="contacto"
                name="contacto"
                value={nuevoCliente.contacto}
                onChange={handleNuevoClienteChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={nuevoCliente.telefono}
                onChange={handleNuevoClienteChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={nuevoCliente.email}
                onChange={handleNuevoClienteChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="direccion">Dirección</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={nuevoCliente.direccion}
                onChange={handleNuevoClienteChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="tipo">Tipo de Cliente</label>
              <select
                id="tipo"
                name="tipo"
                value={nuevoCliente.tipo}
                onChange={handleNuevoClienteChange}
                required
              >
                <option value="Distribuidor">Distribuidor</option>
                <option value="Minorista">Minorista</option>
                <option value="Mayorista">Mayorista</option>
              </select>
            </div>

            <button type="submit" className="button">Registrar Cliente</button>
          </form>
        </div>
      )}

      <div className="filtros-card">
        <h2>Filtros</h2>
        <div className="filtros-grid">
          <div className="form-group">
            <label htmlFor="filtroNombre">Nombre</label>
            <input
              type="text"
              id="filtroNombre"
              name="nombre"
              value={filtros.nombre}
              onChange={handleFilterChange}
              placeholder="Buscar por nombre..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="filtroTipo">Tipo de Cliente</label>
            <select
              id="filtroTipo"
              name="tipo"
              value={filtros.tipo}
              onChange={handleFilterChange}
            >
              <option value="">Todos</option>
              <option value="Distribuidor">Distribuidor</option>
              <option value="Minorista">Minorista</option>
              <option value="Mayorista">Mayorista</option>
            </select>
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
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-card">
        <h2>Lista de Clientes</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Contacto</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrarClientes().map(cliente => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.contacto}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.tipo}</td>
                  <td>
                    <span className={`status ${cliente.estado}`}>
                      {cliente.estado.charAt(0).toUpperCase() + cliente.estado.slice(1)}
                    </span>
                  </td>
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

export default Clientes; 