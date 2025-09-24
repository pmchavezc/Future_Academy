import { useEffect, useState } from 'react';
import { api, type Tarea } from '../../services/api';

interface TareaExtendida extends Tarea {
    id?: number; // Para poder identificar la tarea al subir archivo
}

export default function TareasPage() {
    const [tareas, setTareas] = useState<TareaExtendida[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [subiendoArchivo, setSubiendoArchivo] = useState<number | null>(null);

    useEffect(() => {
        const fetchTareas = async () => {
            try {
                const data = await api.getTareas();
                // Simular IDs para las tareas (en producción esto vendría del backend)
                const tareasConId = data.map((tarea, index) => ({
                    ...tarea,
                    id: index + 1
                }));
                setTareas(tareasConId);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Error cargando tareas');
            } finally {
                setLoading(false);
            }
        };

        fetchTareas();
    }, []);

    const subirArchivo = async (tareaId: number, archivo: File) => {
        setSubiendoArchivo(tareaId);
        try {
            const resultado = await api.subirTarea(archivo, tareaId);
            alert(`Archivo subido exitosamente: ${resultado.nombreArchivo}`);
            // Actualizar el estado de la tarea a "ENVIADO"
            setTareas(prev => prev.map(tarea =>
                tarea.id === tareaId
                    ? { ...tarea, estado: 'ENVIADO' }
                    : tarea
            ));
        } catch (error) {
            alert(error instanceof Error ? error.message : 'Error subiendo archivo');
        } finally {
            setSubiendoArchivo(null);
        }
    };

    const manejarSubidaArchivo = (tareaId: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const archivo = event.target.files?.[0];
        if (archivo) {
            if (archivo.size > 10 * 1024 * 1024) { // 10MB
                alert('El archivo es demasiado grande. Máximo 10MB.');
                return;
            }
            subirArchivo(tareaId, archivo);
        }
    };

    if (loading) return <div>Cargando tareas...</div>;
    if (error) return <div style={{ color: '#ef4444' }}>Error: {error}</div>;

    return (
        <>
            <h2>Mis Tareas</h2>
            {tareas.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '2rem',
                    background: 'var(--card)',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--soft)'
                }}>
                    <p>No tienes tareas asignadas.</p>
                    <p className="muted">Las tareas aparecerán cuando tus profesores las asignen.</p>
                </div>
            ) : (
                <div className="list">
                    {tareas.map((t) => (
                        <div key={t.id} className="list-item">
                            <div className="list-item-header">
                                <div>
                                    <strong>{t.titulo}</strong>
                                    <br />
                                    <span className="muted">{t.curso}</span>
                                    <br />
                                    <small className="muted">
                                        Vence: {new Date(t.fechaEntrega).toLocaleDateString()}
                                    </small>
                                </div>
                                <div className={`badge ${t.estado === 'PENDIENTE' ? 'warn' : 'ok'}`}>
                                    {t.estado === 'PENDIENTE' ? 'Pendiente' : 'Enviado'}
                                </div>
                            </div>

                            <div className="list-item-actions">
                                {t.estado === 'PENDIENTE' && (
                                    <>
                                        <input
                                            type="file"
                                            id={`file-${t.id}`}
                                            style={{ display: 'none' }}
                                            accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                                            onChange={(e) => t.id && manejarSubidaArchivo(t.id, e)}
                                            disabled={subiendoArchivo === t.id}
                                        />
                                        <label
                                            htmlFor={`file-${t.id}`}
                                            className="btn btn-sm"
                                            style={{
                                                cursor: subiendoArchivo === t.id ? 'not-allowed' : 'pointer',
                                                opacity: subiendoArchivo === t.id ? 0.6 : 1
                                            }}
                                        >
                                            {subiendoArchivo === t.id ? 'Subiendo...' : 'Subir Tarea'}
                                        </label>
                                    </>
                                )}
                                <button className="btn btn-sm btn-outline">Ver Detalle</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div style={{
                marginTop: '2rem',
                padding: '1rem',
                background: 'var(--card)',
                borderRadius: '0.5rem',
                border: '1px solid var(--soft)'
            }}>
                <h4>Tipos de archivo permitidos:</h4>
                <p className="muted">PDF, DOC, DOCX, TXT, JPG, PNG (máximo 10MB)</p>
            </div>
        </>
    );
}