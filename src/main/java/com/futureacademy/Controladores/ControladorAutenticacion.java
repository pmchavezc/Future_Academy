package com.futureacademy.Controladores;

import com.futureacademy.dto.SolicitudLogin;
import com.futureacademy.dto.RespuestaLogin;
import com.futureacademy.servicios.ServicioAutenticacion;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/autenticacion")
@RequiredArgsConstructor
public class ControladorAutenticacion {

    private final ServicioAutenticacion servicio;

    @PostMapping("/login")
    public ResponseEntity<RespuestaLogin> login(@Valid @RequestBody SolicitudLogin req) {
        RespuestaLogin respuesta = servicio.login(req);
        return ResponseEntity.ok(respuesta);
    }
}
