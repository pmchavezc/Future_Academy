import { useEffect, useState } from 'react';
import { api, type Tarea } from '../../services/api';

interface TareaExtendida extends Tarea {
    id: number;
    archivoSubido?: string;
}

// Modal component
function Modal({ isOpen, onClose, children }: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}) {
    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '1rem'
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: 'var(--panel)',
                    borderRadius: '0.5rem',
                    padding: '2rem',
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    overflow: 'auto',
                    position: 'relative'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: 'var(--text)'
                    }}
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
}

export default function TareasPage() {
    const [tareas, setTareas] = useState<TareaExtendida[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [subiendoArchivo, setSubiendoArchivo] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [tareaSeleccionada, setTareaSeleccionada] = useState<TareaExtendida | null>(null);

    useEffect(() => {
        const fetchTareas = async () => {
            try {
                const data = await api.getTareas();
                // Recuperar estados guardados del localStorage
                const estadosGuardados = JSON.parse(localStorage.getItem('tareas-estado') || '{}');

                const tareasConId = data.map((tarea, index) => ({
                    ...tarea,
                    id: index + 1,
                    estado: estadosGuardados[index + 1]?.estado || tarea.estado,
                    archivoSubido: estadosGuardados[index + 1]?.archivoSubido
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

    const guardarEstadoTarea = (tareaId: number, estado: string, archivoSubido?: string) => {
        const estadosGuardados = JSON.parse(localStorage.getItem('tareas-estado') || '{}');
        estadosGuardados[tareaId] = { estado, archivoSubido };
        localStorage.setItem('tareas-estado', JSON.stringify(estadosGuardados));
    };

    const subirArchivo = async (tareaId: number, archivo: File) => {
        setSubiendoArchivo(tareaId);
        try {
            const resultado = await api.subirTarea(archivo, tareaId);

            // Actualizar estado local y persistir
            setTareas(prev => prev.map(tarea =>
                tarea.id === tareaId
                    ? { ...tarea, estado: 'ENVIADO', archivoSubido: resultado.nombreArchivo }
                    : tarea
            ));

            // Guardar en localStorage
            guardarEstadoTarea(tareaId, 'ENVIADO', resultado.nombreArchivo);

            alert(`Archivo subido exitosamente: ${resultado.nombreArchivo}`);
        } catch (error) {
            alert(error instanceof Error ? error.message : 'Error subiendo archivo');
        } finally {
            setSubiendoArchivo(null);
        }
    };

    const manejarSubidaArchivo = (tareaId: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const archivo = event.target.files?.[0];
        if (archivo) {
            if (archivo.size > 10 * 1024 * 1024) {
                alert('El archivo es demasiado grande. Máximo 10MB.');
                return;
            }
            subirArchivo(tareaId, archivo);
        }
    };

    const abrirModal = (tarea: TareaExtendida) => {
        setTareaSeleccionada(tarea);
        setModalOpen(true);
    };

    if (loading) return <div>Cargando tareas...</div>;
    if (error) return <div style={{ color: '#ef4444' }}>Error: {error}</div>;

    return (
        <>
            <h2>Mis Tareas</h2>
            {tareas.length === 0 ? (
                <div className="empty-state">
                    <p>No tienes tareas asignadas.</p>
                    <p>Las tareas aparecerán cuando tus profesores las asignen.</p>
                </div>
            ) : (
                <>
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
                                        {t.archivoSubido && (
                                            <div>
                                                <small style={{ color: '#22c55e' }}>
                                                    Archivo: {t.archivoSubido}
                                                </small>
                                            </div>
                                        )}
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
                                                onChange={(e) => manejarSubidaArchivo(t.id, e)}
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
                                    <button
                                        className="btn btn-sm btn-outline"
                                        onClick={() => abrirModal(t)}
                                    >
                                        Ver Detalle
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="empty-state" style={{ marginTop: '2rem' }}>
                        <h4>Tipos de archivo permitidos:</h4>
                        <p>PDF, DOC, DOCX, TXT, JPG, PNG (máximo 10MB)</p>
                    </div>
                </>
            )}

            {/* Modal */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                {tareaSeleccionada && (
                    <div style={{ minWidth: '400px' }}>
                        <h3>{tareaSeleccionada.titulo}</h3>
                        <p><strong>Curso:</strong> {tareaSeleccionada.curso}</p>
                        <p><strong>Fecha de entrega:</strong> {new Date(tareaSeleccionada.fechaEntrega).toLocaleDateString()}</p>
                        <p><strong>Estado:</strong> {tareaSeleccionada.estado === 'PENDIENTE' ? 'Pendiente' : 'Enviado'}</p>

                        {tareaSeleccionada.archivoSubido ? (
                            <div style={{
                                background: 'var(--card)',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                marginTop: '1rem'
                            }}>
                                <h4>Archivo enviado:</h4>
                                <p style={{ color: '#22c55e', fontFamily: 'monospace' }}>
                                    {tareaSeleccionada.archivoSubido}
                                </p>
                                <p className="muted">
                                    El archivo se encuentra guardado en el servidor y ha sido enviado exitosamente.
                                </p>
                            </div>
                        ) : (
                            <div style={{
                                background: 'var(--card)',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                marginTop: '1rem'
                            }}>
                                <p className="muted">No se ha subido ningún archivo para esta tarea.</p>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </>
    );
}