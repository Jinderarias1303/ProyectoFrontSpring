import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Produccion from './pages/Produccion';
import Clientes from './pages/Clientes';
import Pedidos from './pages/Pedidos';
import Inventario from './pages/Inventario';
import './App.css';

// Componente para rutas protegidas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, checkAuth } = useAuth();
  
  if (!isAuthenticated && !checkAuth()) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app">
      {isAuthenticated && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/produccion"
            element={
              <ProtectedRoute>
                <Produccion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pedidos"
            element={
              <ProtectedRoute>
                <Pedidos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clientes"
            element={
              <ProtectedRoute>
                <Clientes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inventario"
            element={
              <ProtectedRoute>
                <Inventario />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
