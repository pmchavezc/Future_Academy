package com.futureacademy.repositorios;

import com.futureacademy.entidades.EntregaTarea;
import com.futureacademy.entidades.Estudiante;
import com.futureacademy.entidades.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RepositorioEntregaTarea extends JpaRepository<EntregaTarea, Long> {
    Optional<EntregaTarea> findByTareaAndAlumno(Tarea tarea, Estudiante alumno);
    List<EntregaTarea> findByAlumno(Estudiante alumno);
}