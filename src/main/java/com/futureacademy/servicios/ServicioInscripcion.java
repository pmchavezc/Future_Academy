package com.futureacademy.servicios;

import com.futureacademy.dto.CursoDto;
import com.futureacademy.entidades.Curso;
import com.futureacademy.entidades.Estudiante;
import com.futureacademy.entidades.Inscripcion;
import com.futureacademy.repositorios.RepositorioCurso;
import com.futureacademy.repositorios.RepositorioEstudiante;
import com.futureacademy.repositorios.RepositorioInscripcion;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServicioInscripcion {

    private final RepositorioEstudiante repoEstudiante;
    private final RepositorioCurso repoCurso;
    private final RepositorioInscripcion repoInscripcion;

    public List<CursoDto> cursosDisponibles(String email) {
        Estudiante estudiante = repoEstudiante.findByEmail(email).orElseThrow();

        // Obtener cursos ya inscritos
        List<Inscripcion> inscripciones = repoInscripcion.findByAlumno(estudiante);
        Set<Long> cursosInscritos = inscripciones.stream()
                .map(ins -> ins.getCurso().getId())
                .collect(Collectors.toSet());

        // Obtener todos los cursos y filtrar los no inscritos
        return repoCurso.findAll().stream()
                .filter(curso -> !cursosInscritos.contains(curso.getId()))
                .map(c -> new CursoDto(c.getId(), c.getCodigo(), c.getNombre(),
                        c.getHorario(), c.getDocente()))
                .toList();
    }

    public void inscribirAlumno(String email, Long cursoId) {
        Estudiante estudiante = repoEstudiante.findByEmail(email).orElseThrow();
        Curso curso = repoCurso.findById(cursoId).orElseThrow();

        // Verificar que no esté ya inscrito
        boolean yaInscrito = repoInscripcion.findByAlumno(estudiante).stream()
                .anyMatch(ins -> ins.getCurso().getId().equals(cursoId));

        if (yaInscrito) {
            throw new RuntimeException("Ya estás inscrito en este curso");
        }

        // Crear nueva inscripción
        Inscripcion inscripcion = Inscripcion.builder()
                .alumno(estudiante)
                .curso(curso)
                .build();

        repoInscripcion.save(inscripcion);
    }
}