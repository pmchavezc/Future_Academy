import { useEffect, useState } from 'react';
import { api, type TareaDto } from '../../services/api';

/* --- Modal --- */
function Modal({
                   isOpen,
                   onClose,
                   children,
               }: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}) {
    if (!isOpen) return null;

    return (
        <div
            className="modal-backdrop"
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '1rem',
            }}
        >
            <div
                className="modal-card"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal
                style={{
                    background: 'var(--panel)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    width: 'min(720px, 92vw)',
                    maxHeight: '90vh',
                    overflow: 'auto',
                    position: 'relative',
                }}
            >
                <button
                    className="modal-close"
                    type="button"
                    onClick={onClose}
                    aria-label="Cerrar"
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 12,
                        border: 'none',
                        background: 'transparent',
                        fontSize: '1.5rem',
                        color: 'var(--text)',
                        cursor: 'pointer',
                    }}
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
}

/* --- Página --- */
export default function TareasPage() {
    const [tareas, setTareas] = useState<TareaDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [subiendo, setSubiendo] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [seleccionada, setSeleccionada] = useState<TareaDto | null>(null);

    const cargar = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await api.getTareas();
            setTareas(data);
        } catch (e: any) {
            setError(e?.message ?? 'Error cargando tareas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { void cargar(); }, []);

    const onFileChange = (tareaId: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 10 * 1024 * 1024) {
            alert('El archivo es demasiado grande. Máximo 10MB.');
            e.currentTarget.value = '';
            return;
        }
        void subir(tareaId, file);
    };

    const subir = async (tareaId: number, archivo: File) => {
        try {
            setSubiendo(tareaId);
            await api.entregarTarea(tareaId, archivo);
            await cargar(); // <- refrescar desde servidor asegura consistencia entre navegadores
            alert('Archivo subido exitosamente');
        } catch (e: any) {
            alert(e?.message ?? 'Error subiendo archivo');
        } finally {
            setSubiendo(null);
        }
    };

    const abrirModal = (t: TareaDto) => {
        setSeleccionada(t);
        setModalOpen(true);
    };

    if (loading) return <div className="loading">Cargando tareas...</div>;
    if (error) return <div className="error">Error: {error}</div>;

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
                        {tareas.map((t) => {
                            const pendiente = t.estado === 'PENDIENTE';
                            return (
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

                                        <div className={`badge ${pendiente ? 'warn' : 'ok'}`}>
                                            {pendiente ? 'Pendiente' : 'Enviado'}
                                        </div>
                                    </div>

                                    <div className="list-item-actions">
                                        {pendiente && (
                                            <>
                                                <input
                                                    type="file"
                                                    id={`file-${t.id}`}
                                                    style={{ display: 'none' }}
                                                    accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                                                    onChange={(e) => onFileChange(t.id, e)}
                                                    disabled={subiendo === t.id}
                                                />
                                                <label
                                                    htmlFor={`file-${t.id}`}
                                                    className="btn btn-sm"
                                                    style={{
                                                        cursor: subiendo === t.id ? 'not-allowed' : 'pointer',
                                                        opacity: subiendo === t.id ? 0.6 : 1,
                                                    }}
                                                >
                                                    {subiendo === t.id ? 'Subiendo...' : 'Subir Tarea'}
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
                            );
                        })}
                    </div>

                    <div className="empty-state" style={{ marginTop: '2rem' }}>
                        <h4>Tipos de archivo permitidos:</h4>
                        <p>PDF, DOC, DOCX, TXT, JPG, PNG (máximo 10MB)</p>
                    </div>
                </>
            )}

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                {seleccionada && (
                    <div style={{ minWidth: '360px' }}>
                        <h3>{seleccionada.titulo}</h3>
                        <p><strong>Curso:</strong> {seleccionada.curso}</p>
                        <p><strong>Fecha de entrega:</strong> {new Date(seleccionada.fechaEntrega).toLocaleDateString()}</p>
                        <p><strong>Estado:</strong> {seleccionada.estado === 'PENDIENTE' ? 'Pendiente' : 'Enviado'}</p>

                        <div
                            style={{
                                background: 'var(--card)',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                marginTop: '1rem',
                            }}
                        >
                            {seleccionada.archivoSubido ? (
                                <>
                                    <h4>Archivo enviado:</h4>
                                    <p style={{ color: '#22c55e', fontFamily: 'monospace' }}>
                                        {seleccionada.archivoSubido}
                                    </p>
                                    <p className="muted">
                                        El archivo se encuentra guardado en el servidor.
                                    </p>
                                </>
                            ) : (
                                <p className="muted">No se ha subido ningún archivo para esta tarea.</p>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}
