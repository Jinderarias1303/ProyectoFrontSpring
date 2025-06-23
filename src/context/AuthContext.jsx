import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      // Aquí irá la llamada a la API
      // Por ahora simulamos una respuesta exitosa
      const response = {
        token: 'dummy-token',
        user: {
          id: 1,
          username: credentials.username,
          role: 'ADMIN', // Esto vendrá del backend
          name: 'Usuario Demo'
        }
      };

      // Guardar el token en localStorage
      localStorage.setItem('token', response.token);
      
      // Actualizar el estado
      setUser(response.user);
      
      return response;
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (newUser) => {
    try {
      setLoading(true);
      setError(null);
      // Simulación de registro exitoso
      const response = {
        token: 'dummy-token',
        user: {
          id: 2,
          username: newUser.username,
          role: 'USER',
          name: newUser.name || newUser.username
        }
      };
      localStorage.setItem('token', response.token);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message || 'Error al registrar usuario');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // Aquí iría la validación del token con el backend
      // Por ahora solo verificamos que exista
      return true;
    }
    return false;
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    checkAuth,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}; 