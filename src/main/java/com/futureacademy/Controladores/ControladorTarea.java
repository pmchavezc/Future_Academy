package com.futureacademy.Controladores;

import com.futureacademy.dto.TareaDto;
import com.futureacademy.servicios.ServicioTarea;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @RequestMapping("/api/tareas") @RequiredArgsConstructor
public class ControladorTarea {

    private final ServicioTarea servicio;

    @GetMapping("/mias")
    public List<TareaDto> mias(@RequestHeader("X-Alumno-Email") String email) {
        return servicio.misTareas(email);
    }
}