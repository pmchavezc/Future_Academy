package com.futureacademy.servicios;

import com.futureacademy.dto.TareaDto;
import com.futureacademy.entidades.Curso;
import com.futureacademy.entidades.Inscripcion;
import com.futureacademy.entidades.Estudiante;
import com.futureacademy.repositorios.RepositorioInscripcion;
import com.futureacademy.repositorios.RepositorioEstudiante;
import com.futureacademy.repositorios.RepositorioTarea;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service @RequiredArgsConstructor
public class ServicioTarea {
    private final RepositorioEstudiante repoEstudiante;
    private final RepositorioInscripcion repoInscripcion;
    private final RepositorioTarea repoTarea;

    public List<TareaDto> misTareas(String email) {
        Estudiante st = repoEstudiante.findByEmail(email).orElseThrow();
        List<Inscripcion> ins = repoInscripcion.findByAlumno(st);
        List<Curso> cursos = ins.stream().map(Inscripcion::getCurso).toList();
        return repoTarea.findByCursoIn(cursos).stream().map(t ->
                new TareaDto(t.getCurso().getNombre(), t.getTitulo(), t.getFechaEntrega().toString(), t.getEstado().name())
        ).toList();
    }
}