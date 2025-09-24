package com.futureacademy.servicios;

import com.futureacademy.entidades.Estudiante;
import com.futureacademy.repositorios.RepositorioEstudiante;
import com.futureacademy.dto.AlumnoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ServicioAlumno {
    private final RepositorioEstudiante repo;

    public AlumnoDto yo(String email) {
        Estudiante s = repo.findByEmail(email).orElseThrow();
        return new AlumnoDto(s.getId(), s.getNombre(), s.getEmail());
    }
}
