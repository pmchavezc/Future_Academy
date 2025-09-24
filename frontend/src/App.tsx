import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
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
                {/* Públicas */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Protegidas */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/app" element={<DashboardLayout />}>
                        <Route index element={<Navigate to="clases" replace />} />
                        <Route path="clases" element={<ClasesPage />} />
                        <Route path="inscripciones" element={<InscripcionesPage />} />
                        <Route path="notas" element={<NotasPage />} />
                        <Route path="tareas" element={<TareasPage />} />
                    </Route>
                </Route>

                {/* 404 */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AuthProvider>
    );
}