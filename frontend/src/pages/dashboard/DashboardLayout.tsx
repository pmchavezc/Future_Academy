import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import '../../styles/dashboard.css';

export default function DashboardLayout() {
    const { user, logout } = useAuth();

    return (
        <div className="dash-shell">
            <aside className="dash-aside">
                <div className="dash-brand">🎓 Future Academy</div>
                <nav className="dash-nav">
                    <NavLink to="clases">Clases</NavLink>
                    <NavLink to="notas">Notas</NavLink>
                    <NavLink to="tareas">Tareas</NavLink>
                </nav>
            </aside>

            <main className="dash-main">
                <header className="dash-topbar">
                    <div className="dash-user">
                        <span className="chip">{user?.nombre}</span>
                        <small className="muted">{user?.email}</small>
                    </div>
                    <div className="spacer" />
                    <button className="btn btn-outline" onClick={logout}>Cerrar sesión</button>
                </header>

                <div className="dash-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}