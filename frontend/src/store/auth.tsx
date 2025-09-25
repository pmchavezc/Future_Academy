import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type User = {
    id: number;
    nombre: string;
    email: string;
    rol: string;
} | null;

type AuthContextType = {
    user: User;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
    error: string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);
const LS_KEY = 'fa.user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState(true);      // <- cambia: inicia en true
    const [error, setError] = useState<string | null>(null);

    // Hidratar sesión desde localStorage
    useEffect(() => {
        try {
            const raw = localStorage.getItem(LS_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed?.email) setUser(parsed);
            }
        } catch {
            localStorage.removeItem(LS_KEY);
        } finally {
            setLoading(false); // <- importante
        }
    }, []);

    // Mantener sesión entre pestañas (opcional pero útil)
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key !== LS_KEY) return;
            if (e.newValue) {
                try {
                    setUser(JSON.parse(e.newValue));
                } catch {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            // tu llamada real:
            // const { api } = await import('../services/api');
            // const resp = await api.login({ email, contrasena: password });

            // Simulación mínima usando tu forma actual:
            const { api } = await import('../services/api');
            const resp = await api.login({ email, contrasena: password });

            const userData = {
                id: resp.alumnoId,
                nombre: resp.nombre,
                email: resp.email,
                rol: resp.rol,
            };
            setUser(userData);
            localStorage.setItem(LS_KEY, JSON.stringify(userData));
        } catch (err: any) {
            setError(err?.message ?? 'Error desconocido');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem(LS_KEY);
        setUser(null);
        setError(null);
    };

    const value = useMemo(
        () => ({ user, login, logout, loading, error }),
        [user, loading, error]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
