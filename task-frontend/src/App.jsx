import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ProductFormPage from './pages/ProductFormPage';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/create"
            element={
              <ProtectedRoute>
                <ProductFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id/edit"
            element={
              <ProtectedRoute>
                <ProductFormPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default App;
