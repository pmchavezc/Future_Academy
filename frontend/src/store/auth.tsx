import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api, type LoginRequest, type LoginResponse } from '../services/api';

type User = {
    id: number;
    nombre: string;
    email: string;
    rol: string;
};

type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
    error: string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Cargar sesión de localStorage al iniciar
    useEffect(() => {
        const raw = localStorage.getItem('fa.user');
        if (raw) {
            try {
                const userData = JSON.parse(raw);
                setUser(userData);
            } catch (e) {
                console.error('Error parsing stored user data:', e);
                localStorage.removeItem('fa.user');
            }
        }
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const credentials: LoginRequest = {
                email,
                contrasena: password
            };

            const response: LoginResponse = await api.login(credentials);

            const userData: User = {
                id: response.alumnoId,
                nombre: response.nombre,
                email: response.email,
                rol: response.rol
            };

            setUser(userData);
            localStorage.setItem('fa.user', JSON.stringify(userData));
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido';
            setError(message);
            throw error; // Re-lanzamos el error para que el componente pueda manejarlo
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setError(null);
        localStorage.removeItem('fa.user');
    };

    const value = useMemo(() => ({
        user,
        login,
        logout,
        loading,
        error
    }), [user, loading, error]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}