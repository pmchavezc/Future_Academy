package com.futureacademy.Controladores;

import com.futureacademy.dto.AlumnoDto;
import com.futureacademy.servicios.ServicioAlumno;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/alumnos")
@RequiredArgsConstructor
public class ControladorAlumno {

    private final ServicioAlumno servicio;

    @GetMapping("/yo")
    public AlumnoDto yo(@RequestHeader("X-Alumno-Email") String email) {
        return servicio.yo(email);
    }
}
