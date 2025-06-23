import { useState, useEffect } from 'react';
import '../styles/Produccion.css';
import Navbar from '../components/Navbar';
import { getLotes } from '../services/loteService';

function Produccion() {
  const [showForm, setShowForm] = useState(false);
  const [lotes, setLotes] = useState([]);

  // Cargar lotes desde el backend al montar el componente
  useEffect(() => {
    getLotes().then(data => {
    console.log('Tipo de data:', typeof data);
    console.log('Contenido de data:', data);

        const lotesFormateados = data.map(lote => ({
          ...lote,
          fechaProduccion: lote.fechaProduccion?.substring(0, 10), // Formato yyyy-MM-dd
        }));
        setLotes(lotesFormateados);
      })
      .catch(error => {
        console.log('Error al cargar lotes:', error);
      });
  }, []);

  const [filtros, setFiltros] = useState({
    tipo: '',
    estado: '',
    fechaInicio: '',
    fechaFin: ''
  });

  const [nuevoLote, setNuevoLote] = useState({
    tipo: '',
    cantidad: '',
    fechaProduccion: '',
    estado: 'Disponible'
  });

  const [errores, setErrores] = useState({});

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNuevoLoteChange = (e) => {
    const { name, value } = e.target;
    setNuevoLote(prev => ({
      ...prev,
      [name]: value
    }));

    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!nuevoLote.tipo.trim()) {
      nuevosErrores.tipo = 'El tipo de producto es requerido';
    }

    if (!nuevoLote.cantidad) {
      nuevosErrores.cantidad = 'La cantidad es requerida';
    } else if (isNaN(nuevoLote.cantidad) || Number(nuevoLote.cantidad) <= 0) {
      nuevosErrores.cantidad = 'La cantidad debe ser un número positivo';
    }

    if (!nuevoLote.fechaProduccion) {
      nuevosErrores.fechaProduccion = 'La fecha es requerida';
    } else {
      const fechaSeleccionada = new Date(nuevoLote.fechaProduccion);
      const fechaActual = new Date();
      if (fechaSeleccionada > fechaActual) {
        nuevosErrores.fechaProduccion = 'La fecha no puede ser futura';
      }
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      const id = `L-${String(lotes.length + 1).padStart(3, '0')}`;
      setLotes(prev => [...prev, { ...nuevoLote, id }]);
      setNuevoLote({
        tipo: '',
        cantidad: '',
        fechaProduccion: '',
        estado: 'Disponible'
      });
      setShowForm(false);
      setErrores({});
    }
  };

  const filtrarLotes = () => {
    return lotes.filter(lote => {
      const cumpleTipo = !filtros.tipo || lote.tipo === filtros.tipo;
      const cumpleEstado = !filtros.estado || lote.estado === filtros.estado;
      const cumpleFechaInicio = !filtros.fechaInicio || lote.fechaProduccion >= filtros.fechaInicio;
      const cumpleFechaFin = !filtros.fechaFin || lote.fechaProduccion <= filtros.fechaFin;

      return cumpleTipo && cumpleEstado && cumpleFechaInicio && cumpleFechaFin;
    });
  };

  return (
    <div className="produccion">
      <Navbar />
      <div className="produccion-header">
        <h1>Gestión de Producción</h1>
        <button className="button" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Nuevo Lote'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h2>Registrar Nuevo Lote</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="tipo">Tipo de Producto</label>
              <select
                id="tipo"
                name="tipo"
                value={nuevoLote.tipo}
                onChange={handleNuevoLoteChange}
                className={errores.tipo ? 'error' : ''}
                required
              >
                <option value="">Seleccione un tipo</option>
                <option value="Atún en Aceite">Atún en Aceite</option>
                <option value="Atún en Agua">Atún en Agua</option>
                <option value="Atún en Salsa">Atún en Salsa</option>
              </select>
              {errores.tipo && <span className="error-message">{errores.tipo}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="cantidad">Cantidad</label>
              <input
                type="number"
                id="cantidad"
                name="cantidad"
                value={nuevoLote.cantidad}
                onChange={handleNuevoLoteChange}
                className={errores.cantidad ? 'error' : ''}
                required
                min="1"
              />
              {errores.cantidad && <span className="error-message">{errores.cantidad}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="fechaProduccion">Fecha de Producción</label>
              <input
                type="date"
                id="fechaProduccion"
                name="fechaProduccion"
                value={nuevoLote.fechaProduccion}
                onChange={handleNuevoLoteChange}
                className={errores.fechaProduccion ? 'error' : ''}
                required
              />
              {errores.fechaProduccion && <span className="error-message">{errores.fechaProduccion}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="estado">Estado</label>
              <select
                id="estado"
                name="estado"
                value={nuevoLote.estado}
                onChange={handleNuevoLoteChange}
                required
              >
                <option value="Disponible">Disponible</option>
                <option value="Vendido">Vendido</option>
                <option value="Defectuoso">Defectuoso</option>
              </select>
            </div>

            <button type="submit" className="button">
              Registrar Lote
            </button>
          </form>
        </div>
      )}

      <div className="filtros-card">
        <h2>Filtros</h2>
        <div className="filtros-grid">
          <div className="form-group">
            <label htmlFor="filtroTipo">Tipo de Producto</label>
            <select
              id="filtroTipo"
              name="tipo"
              value={filtros.tipo}
              onChange={handleFiltroChange}
            >
              <option value="">Todos</option>
              <option value="Atún en Aceite">Atún en Aceite</option>
              <option value="Atún en Agua">Atún en Agua</option>
              <option value="Atún en Salsa">Atún en Salsa</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="filtroEstado">Estado</label>
            <select
              id="filtroEstado"
              name="estado"
              value={filtros.estado}
              onChange={handleFiltroChange}
            >
              <option value="">Todos</option>
              <option value="Disponible">Disponible</option>
              <option value="Vendido">Vendido</option>
              <option value="Defectuoso">Defectuoso</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="fechaInicio">Fecha Inicio</label>
            <input
              type="date"
              id="fechaInicio"
              name="fechaInicio"
              value={filtros.fechaInicio}
              onChange={handleFiltroChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="fechaFin">Fecha Fin</label>
            <input
              type="date"
              id="fechaFin"
              name="fechaFin"
              value={filtros.fechaFin}
              onChange={handleFiltroChange}
            />
          </div>
        </div>
      </div>

      <div className="table-card">
        <h2>Lotes de Producción</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Cantidad</th>
                <th>Fecha de Producción</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrarLotes().map(lote => (
                <tr key={lote.id}>
                  <td>{lote.id}</td>
                  <td>{lote.tipo}</td>
                  <td>{lote.cantidad}</td>
                  <td>{lote.fechaProduccion}</td>
                  <td>
                    <span className={`status ${lote.estado.toLowerCase()}`}>
                      {lote.estado}
                    </span>
                  </td>
                  <td>
                    <button className="button-small">Editar</button>
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

export default Produccion;
