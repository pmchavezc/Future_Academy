package com.futureacademy.repositorios;

import com.futureacademy.entidades.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RepositorioEstudiante extends JpaRepository<Estudiante, Long> {
    Optional<Estudiante> findByEmail(String email);
}
