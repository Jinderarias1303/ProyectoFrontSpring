import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Cerrar el menú móvil después de navegar
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Atunes del Pacífico S.A.</h1>
      </div>
      
      <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <button onClick={() => handleNavigation('/')}>Inicio</button>
          </li>
          <li className="nav-item">
            <button onClick={() => handleNavigation('/produccion')}>Producción</button>
          </li>
          <li className="nav-item">
            <button onClick={() => handleNavigation('/pedidos')}>Pedidos</button>
          </li>
          <li className="nav-item">
            <button onClick={() => handleNavigation('/clientes')}>Clientes</button>
          </li>
          <li className="nav-item">
            <button onClick={() => handleNavigation('/inventario')}>Inventario</button>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <div className="user-menu">
          <span className="user-name">{user?.name || 'Usuario'}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      <button 
        className="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}

export default Navbar; 