package com.futureacademy.Controladores;

import com.futureacademy.dto.CursoDto;
import com.futureacademy.servicios.ServicioInscripcion;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inscripciones")
@RequiredArgsConstructor
public class ControladorInscripcion {

    private final ServicioInscripcion servicio;

    @GetMapping("/disponibles")
    public List<CursoDto> cursosDisponibles(@RequestHeader("X-Alumno-Email") String email) {
        return servicio.cursosDisponibles(email);
    }

    @PostMapping("/inscribir/{cursoId}")
    public ResponseEntity<Map<String, String>> inscribirseACurso(
            @PathVariable Long cursoId,
            @RequestHeader("X-Alumno-Email") String email) {

        servicio.inscribirAlumno(email, cursoId);
        return ResponseEntity.ok(Map.of("message", "Inscripción exitosa"));
    }
}