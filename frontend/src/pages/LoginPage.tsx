import {type FormEvent, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../store/auth';
import '../styles/home.css';

export default function LoginPage() {
    const { login, loading, error } = useAuth();
    const navigate = useNavigate();
    const location = useLocation() as any;
    const redirectTo = location.state?.from?.pathname || '/app';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState('');

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLocalError('');

        try {
            await login(email, password);
            navigate(redirectTo, { replace: true });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error de autenticación';
            setLocalError(message);
        }
    };

    return (
        <div className="auth-wrap">
            <div className="auth-card">
                <h1>Iniciar sesión</h1>
                <p className="muted">Centro Educativo Future Academy</p>

                <form onSubmit={onSubmit} className="auth-form">
                    <label>
                        Correo
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tucorreo@ejemplo.com"
                            disabled={loading}
                        />
                    </label>
                    <label>
                        Contraseña
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            disabled={loading}
                        />
                    </label>

                    {(error || localError) && (
                        <div style={{
                            color: '#ef4444',
                            fontSize: '0.875rem',
                            marginBottom: '0.75rem'
                        }}>
                            {error || localError}
                        </div>
                    )}

                    <button
                        className="btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Ingresando...' : 'Entrar'}
                    </button>
                </form>

                <div className="auth-links">
                    <Link to="/">← Volver al inicio</Link>
                </div>
            </div>
        </div>
    );
}