export default function ClasesPage() {
    const clases = [
        { codigo: 'MAT101', nombre: 'Matemática I', horario: 'Lun-Mie 8:00–9:30', docente: 'Lic. Gómez' },
        { codigo: 'LEN102', nombre: 'Comunicación', horario: 'Mar-Jue 10:00–11:30', docente: 'Licda. Pérez' },
        { codigo: 'CIE103', nombre: 'Ciencias', horario: 'Vie 9:00–11:00', docente: 'Ing. Morales' },
    ];
    return (
        <>
            <h2>Mis clases</h2>
            <div className="cards-3">
                {clases.map(c => (
                    <article key={c.codigo} className="card">
                        <h3>{c.nombre}</h3>
                        <p className="muted">{c.codigo}</p>
                        <p>Horario: {c.horario}</p>
                        <p>Docente: {c.docente}</p>
                        <button className="btn btn-sm">Ver Aula Virtual</button>
                    </article>
                ))}
            </div>
        </>
    );
}