package com.futureacademy.servicios;

import com.futureacademy.dto.TareaDto;
import com.futureacademy.entidades.*;
import com.futureacademy.repositorios.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service @RequiredArgsConstructor
public class ServicioTarea {
    private final RepositorioEstudiante repoEstudiante;
    private final RepositorioInscripcion repoInscripcion;
    private final RepositorioTarea repoTarea;
    private final RepositorioEntregaTarea repoEntrega;

    public List<TareaDto> misTareas(String email) {
        Estudiante st = repoEstudiante.findByEmail(email).orElseThrow();
        List<Inscripcion> ins = repoInscripcion.findByAlumno(st);
        List<Curso> cursos = ins.stream().map(Inscripcion::getCurso).toList();

        return repoTarea.findByCursoIn(cursos).stream().map(t -> {
            var entregaOpt = repoEntrega.findByTareaAndAlumno(t, st);
            var estado = entregaOpt.map(EntregaTarea::getEstado)
                    .orElse(EntregaTarea.Estado.PENDIENTE)
                    .name();
            var archivo = entregaOpt.map(EntregaTarea::getNombreArchivo).orElse(null);
            return new TareaDto(
                    t.getId(),
                    t.getCurso().getNombre(),
                    t.getTitulo(),
                    t.getFechaEntrega().toString(),
                    estado,
                    archivo
            );
        }).toList();
    }

    /** Guarda el archivo y marca ENVIADO la entrega del alumno para esa tarea */
    public String entregarTarea(String email, Long tareaId, String nombreArchivoGuardado) {
        Estudiante st = repoEstudiante.findByEmail(email).orElseThrow();
        Tarea tarea = repoTarea.findById(tareaId).orElseThrow();

        EntregaTarea entrega = repoEntrega.findByTareaAndAlumno(tarea, st)
                .orElse(EntregaTarea.builder().tarea(tarea).alumno(st).build());

        entrega.setEstado(EntregaTarea.Estado.ENVIADO);
        entrega.setNombreArchivo(nombreArchivoGuardado);
        entrega.setFechaSubida(LocalDateTime.now());
        repoEntrega.save(entrega);

        return entrega.getNombreArchivo();
    }
}