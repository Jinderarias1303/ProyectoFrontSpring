import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

function Login() {
  const navigate = useNavigate();
  const { login, register, loading, error } = useAuth();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
    name: ''
  });
  const [registerError, setRegisterError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      navigate('/');
    } catch {
      // El error ya se maneja por el contexto
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError(null);
    try {
      await register(registerData);
      navigate('/');
    } catch {
      setRegisterError('Error al registrar usuario');
    }
  };

  return (
    <div className="login-outer">
      <div className="login-container">
        <div className="form-wrapper">
          <div className="login-card">
            <div className="login-header">
              <h1>Atunes del Pacífico S.A.</h1>
              <p>Sistema de Gestión</p>
            </div>
            <form onSubmit={handleSubmit} className="login-form">
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}
              <div className="form-group">
                <label htmlFor="username">Usuario</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              <button 
                type="submit" 
                className="login-button"
                disabled={loading}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>
            </form>
          </div>
          <div className="login-card register-card">
            <div className="login-header">
              <h1>Registro de Usuario</h1>
              <p>Crea tu cuenta</p>
            </div>
            <form onSubmit={handleRegister} className="login-form">
              {registerError && (
                <div className="error-message">
                  {registerError}
                </div>
              )}
              <div className="form-group">
                <label htmlFor="register-name">Nombre</label>
                <input
                  type="text"
                  id="register-name"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="register-username">Usuario</label>
                <input
                  type="text"
                  id="register-username"
                  name="username"
                  value={registerData.username}
                  onChange={handleRegisterChange}
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="register-password">Contraseña</label>
                <input
                  type="password"
                  id="register-password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                  disabled={loading}
                />
              </div>
              <button 
                type="submit" 
                className="login-button"
                disabled={loading}
              >
                {loading ? 'Registrando...' : 'Registrarse'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login; 