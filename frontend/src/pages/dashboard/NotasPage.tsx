export default function NotasPage() {
    const notas = [
        { curso: 'Matemática I', parcial: 1, nota: 85 },
        { curso: 'Comunicación', parcial: 1, nota: 92 },
        { curso: 'Ciencias', parcial: 1, nota: 88 },
    ];
    const promedio = Math.round(notas.reduce((a, n) => a + n.nota, 0) / notas.length);

    return (
        <>
            <h2>Mis notas</h2>
            <table className="tbl">
                <thead>
                <tr><th>Curso</th><th>Parcial</th><th>Nota</th></tr>
                </thead>
                <tbody>
                {notas.map((n, i) => (
                    <tr key={i}><td>{n.curso}</td><td>{n.parcial}</td><td>{n.nota}</td></tr>
                ))}
                </tbody>
                <tfoot>
                <tr><td colSpan={2}>Promedio</td><td>{promedio}</td></tr>
                </tfoot>
            </table>
        </>
    );
}