export default function TareasPage() {
    const tareas = [
        { curso: 'Matemática I', titulo: 'Guía 2', vence: '2025-10-02', estado: 'Pendiente' },
        { curso: 'Comunicación', titulo: 'Ensayo', vence: '2025-10-05', estado: 'Enviado' },
        { curso: 'Ciencias', titulo: 'Laboratorio 1', vence: '2025-10-06', estado: 'Pendiente' },
    ];
    return (
        <>
            <h2>Tareas</h2>
            <div className="list">
                {tareas.map((t, i) => (
                    <div key={i} className="list-item">
                        <div>
                            <strong>{t.titulo}</strong> <span className="muted">({t.curso})</span>
                            <div className="muted">Vence: {new Date(t.vence).toLocaleDateString()}</div>
                        </div>
                        <div className={`badge ${t.estado === 'Pendiente' ? 'warn' : 'ok'}`}>{t.estado}</div>
                        <button className="btn btn-sm">Ver Detalle</button>
                    </div>
                ))}
            </div>
        </>
    );
}