package com.futureacademy.repositorios;

import com.futureacademy.entidades.Calificacion;
import com.futureacademy.entidades.Inscripcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepositorioCalificacion extends JpaRepository<Calificacion, Long> {
    List<Calificacion> findByInscripcionIn(List<Inscripcion> inscripciones);
}
