package com.futureacademy.servicios;

import com.futureacademy.dto.CursoDto;
import com.futureacademy.entidades.Curso;
import com.futureacademy.entidades.Inscripcion;
import com.futureacademy.entidades.Estudiante;
import com.futureacademy.repositorios.RepositorioInscripcion;
import com.futureacademy.repositorios.RepositorioEstudiante;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service @RequiredArgsConstructor
public class ServicioCurso {
    private final RepositorioEstudiante repoEstudiante;
    private final RepositorioInscripcion repoInscripcion;

    public List<CursoDto> misCursos(String email) {
        Estudiante st = repoEstudiante.findByEmail(email).orElseThrow();
        List<Inscripcion> ins = repoInscripcion.findByAlumno(st);
        return ins.stream().map(i -> {
            Curso c = i.getCurso();
            return new CursoDto(c.getId(), c.getCodigo(), c.getNombre(), c.getHorario(), c.getDocente());
        }).toList();
    }
}