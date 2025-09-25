import { useEffect, useState } from 'react';
import { api, type Curso } from '../../services/api';

export default function ClasesPage() {
    const [clases, setClases] = useState<Curso[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClases = async () => {
            try {
                const data = await api.getCursos();
                setClases(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Error cargando clases');
            } finally {
                setLoading(false);
            }
        };

        fetchClases();
    }, []);

    if (loading) return <div>Cargando clases...</div>;
    if (error) return <div style={{ color: '#ef4444' }}>Error: {error}</div>;

    return (
        <>
            <h2>Mis Clases Inscritas</h2>
            {clases.length === 0 ? (
                <div className="empty-state">
                    <p>No tienes clases inscritas aún.</p>
                    <p>Ve a "Inscripciones" para inscribirte a nuevos cursos.</p>
                </div>
            ) : (
                <div className="cards-3">
                    {clases.map(c => (
                        <article key={c.id} className="card">
                            <h3>{c.nombre}</h3>
                            <p className="muted">{c.codigo}</p>
                            <p><strong>Horario:</strong> {c.horario}</p>
                            <p><strong>Docente:</strong> {c.docente}</p>
                        </article>
                    ))}
                </div>
            )}
        </>
    );
}