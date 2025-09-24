package com.futureacademy.Controladores;

import com.futureacademy.dto.CursoDto;
import com.futureacademy.servicios.ServicioCurso;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @RequestMapping("/api/cursos") @RequiredArgsConstructor
public class ControladorCurso {

    private final ServicioCurso servicio;

    @GetMapping("/mios")
    public List<CursoDto> mios(@RequestHeader("X-Alumno-Email") String email) {
        return servicio.misCursos(email);
    }
}