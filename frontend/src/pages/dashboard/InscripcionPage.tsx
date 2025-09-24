import { useEffect, useState } from 'react';
import { api, type Curso } from '../../services/api';

export default function InscripcionesPage() {
    const [cursosDisponibles, setCursosDisponibles] = useState<Curso[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [inscribiendo, setInscribiendo] = useState<number | null>(null);

    useEffect(() => {
        fetchCursosDisponibles();
    }, []);

    const fetchCursosDisponibles = async () => {
        try {
            const data = await api.getCursosDisponibles();
            setCursosDisponibles(data);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error cargando cursos disponibles');
        } finally {
            setLoading(false);
        }
    };

    const inscribirseACurso = async (cursoId: number) => {
        setInscribiendo(cursoId);
        try {
            await api.inscribirseACurso(cursoId);
            // Actualizar la lista quitando el curso inscrito
            setCursosDisponibles(prev => prev.filter(curso => curso.id !== cursoId));
            alert('¡Inscripción exitosa!');
        } catch (error) {
            alert(error instanceof Error ? error.message : 'Error en la inscripción');
        } finally {
            setInscribiendo(null);
        }
    };

    if (loading) return <div>Cargando cursos disponibles...</div>;
    if (error) return <div style={{ color: '#ef4444' }}>Error: {error}</div>;

    return (
        <>
            <h2>Cursos Disponibles</h2>
            {cursosDisponibles.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '2rem',
                    background: 'var(--card)',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--soft)'
                }}>
                    <p>No hay cursos disponibles para inscripción.</p>
                    <p className="muted">Ya estás inscrito en todos los cursos disponibles.</p>
                </div>
            ) : (
                <div className="cards-3">
                    {cursosDisponibles.map(c => (
                        <article key={c.id} className="card">
                            <h3>{c.nombre}</h3>
                            <p className="muted">{c.codigo}</p>
                            <p><strong>Horario:</strong> {c.horario}</p>
                            <p><strong>Docente:</strong> {c.docente}</p>
                            <button
                                className="btn btn-sm"
                                onClick={() => inscribirseACurso(c.id)}
                                disabled={inscribiendo === c.id}
                            >
                                {inscribiendo === c.id ? 'Inscribiendo...' : 'Inscribirme'}
                            </button>
                        </article>
                    ))}
                </div>
            )}
        </>
    );
}