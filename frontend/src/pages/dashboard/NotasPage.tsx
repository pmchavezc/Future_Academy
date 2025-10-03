import { useEffect, useState } from 'react';
import { api, type Calificacion } from '../../services/api';

export default function NotasPage() {
    const [notas, setNotas] = useState<Calificacion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNotas = async () => {
            try {
                const data = await api.getCalificaciones();
                setNotas(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Error cargando notas');
            } finally {
                setLoading(false);
            }
        };

        fetchNotas();
    }, []);

    if (loading) return <div>Cargando notas...</div>;
    if (error) return <div style={{ color: '#ef4444' }}>Error: {error}</div>;

    const promedio = notas.length > 0
        ? Math.round(notas.reduce((a, n) => a + n.nota, 0) / notas.length)
        : 0;

    const getNotaColor = (nota: number) => {
        if (nota >= 90) return '#130f0f'; // blanco
        if (nota >= 80) return 'rgba(15,42,16,0.8)'; // negro
        if (nota >= 70) return 'rgb(23,3,3)'; // Amarillo
        return '#ef4444'; // Rojo
    };

    return (
        <>
            <h2>Mis Notas</h2>
            {notas.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '2rem',
                    background: 'var(--card)',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--soft)'
                }}>
                    <p>No tienes notas registradas aún.</p>
                    <p className="muted">Las notas aparecerán cuando tus profesores las ingresen al sistema.</p>
                </div>
            ) : (
                <div className="table-wrapper">
                    <table className="tbl">
                        <thead>
                        <tr><th>Curso</th><th>Parcial</th><th>Nota</th></tr>
                        </thead>
                        <tbody>
                        {notas.map((n, i) => (
                            <tr key={i}>
                                <td>{n.curso}</td>
                                <td>{n.parcial}</td>
                                <td style={{
                                    color: getNotaColor(n.nota),
                                    fontWeight: 'bold'
                                }}>
                                    {n.nota}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan={2}><strong>Promedio</strong></td>
                            <td style={{
                                color: getNotaColor(promedio),
                                fontWeight: 'bold'
                            }}>
                                {promedio}
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            )}
        </>
    );
}