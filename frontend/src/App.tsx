import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Tu componente de inicio
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './store/auth';
import ProtectedRoute from './routes/ProtectedRoute';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import ClasesPage from './pages/dashboard/ClasesPage';
import InscripcionesPage from './pages/dashboard/InscripcionPage';
import NotasPage from './pages/dashboard/NotasPage';
import TareasPage from './pages/dashboard/TareasPage';

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                {/* 1. RUTA RAÍZ: La HomePage se renderiza cuando la URL es /#/ o solo / */}
                {/* Si la página sigue en blanco, el problema es que HomePage no se está renderizando,
                   y debe ser corregido en el componente mismo.
                */}
                <Route path="/" element={<HomePage />} />

                {/* 2. Login Page */}
                <Route path="/login" element={<LoginPage />} />

                {/* Rutas Protegidas */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/app" element={<DashboardLayout />}>
                        {/* Redirección interna dentro del layout */}
                        <Route index element={<Navigate to="clases" replace />} />
                        <Route path="clases" element={<ClasesPage />} />
                        <Route path="inscripciones" element={<InscripcionesPage />} />
                        <Route path="notas" element={<NotasPage />} />
                        <Route path="tareas" element={<TareasPage />} />
                    </Route>
                </Route>

                {/* 🚨 3. RUTA 404 (CLAVE) 🚨 */}
                {/* Si no se encuentra ninguna ruta, NO redirige a /, sino a una ruta definida como /login.
                   Esto evita el bucle de redirección en GitHub Pages.
                */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </AuthProvider>
    );
}