package com.futureacademy.repositorios;

import com.futureacademy.entidades.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioCurso extends JpaRepository<Curso, Long> {}
