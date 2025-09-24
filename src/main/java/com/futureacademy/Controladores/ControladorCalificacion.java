package com.futureacademy.Controladores;

import com.futureacademy.dto.CalificacionDto;
import com.futureacademy.servicios.ServicioCalificacion;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @RequestMapping("/api/calificaciones") @RequiredArgsConstructor
public class ControladorCalificacion {

    private final ServicioCalificacion servicio;

    @GetMapping("/mias")
    public List<CalificacionDto> mias(@RequestHeader("X-Alumno-Email") String email) {
        return servicio.misCalificaciones(email);
    }
}
