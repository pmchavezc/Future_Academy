package com.futureacademy.servicios;

import com.futureacademy.dto.CalificacionDto;
import com.futureacademy.entidades.Inscripcion;
import com.futureacademy.entidades.Calificacion;
import com.futureacademy.entidades.Estudiante;
import com.futureacademy.repositorios.RepositorioInscripcion;
import com.futureacademy.repositorios.RepositorioCalificacion;
import com.futureacademy.repositorios.RepositorioEstudiante;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service @RequiredArgsConstructor
public class ServicioCalificacion {
    private final RepositorioEstudiante repoEstudiante;
    private final RepositorioInscripcion repoInscripcion;
    private final RepositorioCalificacion repoCalificacion;

    public List<CalificacionDto> misCalificaciones(String email) {
        Estudiante st = repoEstudiante.findByEmail(email).orElseThrow();
        List<Inscripcion> ins = repoInscripcion.findByAlumno(st);
        List<Calificacion> califs = repoCalificacion.findByInscripcionIn(ins);
        return califs.stream().map(c ->
                new CalificacionDto(c.getInscripcion().getCurso().getNombre(), c.getParcial(), c.getNota())
        ).toList();
    }
}
