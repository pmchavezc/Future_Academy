import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../store/auth';

export default function ProtectedRoute() {
    const { user, loading } = useAuth();
    const location = useLocation();

    // 1) Mientras hidratamos, no redirigimos
    if (loading) {
        return <div style={{ padding: 24 }}>Cargando sesión…</div>;
    }

    // 2) Ya hidratado: si no hay user, ahora sí redirige
    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
}
