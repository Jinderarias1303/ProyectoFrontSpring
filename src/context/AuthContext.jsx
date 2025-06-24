// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// ** URLs COMPLETAS DE TUS ENDPOINTS **
// Si tu backend usa estas rutas específicas para login y register
// y corren en localhost:8080
const LOGIN_ENDPOINT = 'http://localhost:8080/api/auth/login';    // <--- ¡VERIFICA ESTA URL EN TU BACKEND!
const REGISTER_ENDPOINT = 'http://localhost:8080/api/auth/register'; // <--- ¡VERIFICA ESTA URL EN TU BACKEND!

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper para hacer peticiones fetch con headers configurados
  const fetchApi = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorData = null;
      try {
        errorData = await response.json();
      } catch (parseError) {
        // Si no se puede parsear como JSON, usar el estado y texto del error HTTP
        errorData = { message: response.statusText || 'Error desconocido del servidor.' };
      }
      // Crear un objeto de error más completo
      const customError = new Error(errorData.message || 'Error en la petición.');
      customError.response = {
        status: response.status,
        data: errorData,
      };
      throw customError; // Lanzar el error personalizado
    }

    return response.json();
  };

  useEffect(() => {
    const loadUserFromStorage = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (e) {
          console.error("Error al parsear los datos del usuario almacenados:", e);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
      }
      setLoading(false);
    };
    loadUserFromStorage();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      // Usa directamente la URL completa para el login
      const responseData = await fetchApi(LOGIN_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      const { token, user: userData } = responseData; // Asegúrate de que tu backend devuelve 'token' y 'user'

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
      return responseData;
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      let errorMessage = 'Error al iniciar sesión. Verifica tus credenciales y la conexión al servidor.';

      // ** CORRECCIÓN: Acceso seguro a las propiedades del error **
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        // Para errores de red o errores genéricos donde 'response' no está definido
        errorMessage = err.message;
      }

      setError(errorMessage);
      throw err; // Re-lanzar el error para que los componentes puedan manejarlo si es necesario
    } finally {
      setLoading(false);
    }
  };

  const register = async (newUser) => {
    setLoading(true);
    setError(null);
    try {
      // Usa directamente la URL completa para el registro
      const responseData = await fetchApi(REGISTER_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(newUser),
      });

      const { token, user: userData } = responseData; // Asegúrate de que tu backend devuelve 'token' y 'user'

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
      return responseData;
    } catch (err) {
      console.error("Error al registrar usuario:", err);
      let errorMessage = 'Error al registrar usuario. Intenta con otro nombre de usuario o contacta al administrador.';

      // ** CORRECCIÓN: Acceso seguro a las propiedades del error **
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        // Para errores de red o errores genéricos donde 'response' no está definido
        errorMessage = err.message;
      }
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  const isAuthenticated = !!user;

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    checkAuth,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading && !isAuthenticated ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px' }}>
          Cargando autenticación...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
