import React, { useCallback, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../store/auth";
import "../../styles/dashboard.css";

type User = { nombre?: string; email?: string } | null;
type AuthApi = { user: User; logout: () => void };

const TITLES: Record<string, string> = {
    "/app/clases": "Mis Clases Inscritas",
    "/app/inscripciones": "Inscripciones",
    "/app/notas": "Mis Notas",
    "/app/tareas": "Mis Tareas",
};

const DashboardLayout: React.FC = () => {
    const { user, logout } = useAuth() as unknown as AuthApi;

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const closeSidebar = useCallback(() => setSidebarOpen(false), []);
    const toggleSidebar = useCallback(() => setSidebarOpen((v) => !v), []);

    const { pathname } = useLocation();
    const pageTitle = TITLES[pathname] ?? "";

    return (
        <div className="dash-shell">
            {/* Sidebar */}
            <aside
                id="dash-aside"
                className={`dash-aside ${sidebarOpen ? "open" : ""}`}
                aria-hidden={!sidebarOpen}
                aria-label="Barra lateral de navegación"
            >
                <div className="dash-brand">🎓 Future Academy</div>

                <nav className="dash-nav" aria-label="Secciones del panel">
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

            {/* Overlay (solo móvil) */}
            <div
                className={`dash-overlay ${sidebarOpen ? "show" : ""}`}
                onClick={closeSidebar}
                aria-hidden={!sidebarOpen}
            />

            {/* Main */}
            <main
                className="dash-main"
                onClick={sidebarOpen ? closeSidebar : undefined}
            >
                <header className="dash-topbar">
                    {/* Botón hamburguesa en móvil */}
                    <button
                        type="button"
                        className="menu-toggle"
                        onClick={toggleSidebar}
                        aria-label={sidebarOpen ? "Cerrar menú" : "Abrir menú"}
                        aria-expanded={sidebarOpen}
                        aria-controls="dash-aside"
                    >
                        ☰
                    </button>

                    {/* Título de la página a la par de los botones */}
                    {pageTitle && <h2 className="dash-title">{pageTitle}</h2>}

                    <div className="spacer" />

                    <div className="dash-user">
                        <span className="chip">{user?.nombre ?? "Usuario"}</span>
                        <small className="muted">{user?.email ?? ""}</small>
                    </div>

                    <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={logout}
                    >
                        Cerrar sesión
                    </button>
                </header>

                <div className="dash-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;