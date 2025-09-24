package com.futureacademy.repositorios;

import com.futureacademy.entidades.Inscripcion;
import com.futureacademy.entidades.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepositorioInscripcion extends JpaRepository<Inscripcion, Long> {
    List<Inscripcion> findByAlumno(Estudiante alumno);
}
