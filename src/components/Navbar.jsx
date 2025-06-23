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

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Atunes del Pacífico S.A.</h1>
      </div>
      
      <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="/dashboard">Inicio</a>
          </li>
          <li className="nav-item">
            <a href="/produccion">Producción</a>
          </li>
          <li className="nav-item">
            <a href="/pedidos">Pedidos</a>
          </li>
          <li className="nav-item">
            <a href="/clientes">Clientes</a>
          </li>
          <li className="nav-item">
            <a href="/inventario">Inventario</a>
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