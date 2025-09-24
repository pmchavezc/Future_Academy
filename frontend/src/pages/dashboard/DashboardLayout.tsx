import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import '../../styles/dashboard.css';

export default function DashboardLayout() {
    const { user, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const closeSidebar = () => setSidebarOpen(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="dash-shell">
            {/* Overlay para móvil */}
            <div
                className={`dash-overlay ${sidebarOpen ? 'show' : ''}`}
                onClick={closeSidebar}
            />

            {/* Sidebar */}
            <aside className={`dash-aside ${sidebarOpen ? 'open' : ''}`}>
                <div className="dash-brand">🎓 Future Academy</div>
                <nav className="dash-nav">
                    <NavLink to="clases" onClick={closeSidebar}>
                        📚 Mis Clases
                    </NavLink>
                    <NavLink to="inscripciones" onClick={closeSidebar}>
                        ➕ Inscripciones
                    </NavLink>
                    <NavLink to="notas" onClick={closeSidebar}>
                        📊 Mis Notas
                    </NavLink>
                    <NavLink to="tareas" onClick={closeSidebar}>
                        📝 Mis Tareas
                    </NavLink>
                </nav>
            </aside>

            <main className="dash-main">
                {/* Top bar */}
                <header className="dash-topbar">
                    {/* Botón menú hamburguesa (solo visible en móvil) */}
                    <button
                        className="menu-toggle"
                        onClick={toggleSidebar}
                        aria-label="Abrir menú"
                    >
                        ☰
                    </button>

                    <div className="dash-user">
                        <span className="chip">{user?.nombre}</span>
                        <small className="muted">{user?.email}</small>
                    </div>

                    <div className="spacer" />

                    <button className="btn btn-outline btn-sm" onClick={logout}>
                        Cerrar sesión
                    </button>
                </header>

                {/* Contenido */}
                <div className="dash-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}