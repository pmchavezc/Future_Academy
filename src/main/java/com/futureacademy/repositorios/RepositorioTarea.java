package com.futureacademy.repositorios;

import com.futureacademy.entidades.Tarea;
import com.futureacademy.entidades.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepositorioTarea extends JpaRepository<Tarea, Long> {
    List<Tarea> findByCursoIn(List<Curso> cursos);
}
