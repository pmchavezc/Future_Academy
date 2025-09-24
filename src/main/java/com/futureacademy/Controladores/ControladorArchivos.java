package com.futureacademy.Controladores;

import com.futureacademy.servicios.ServicioArchivos;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/archivos")
@RequiredArgsConstructor
public class ControladorArchivos {

    private final ServicioArchivos servicio;

    @PostMapping("/subir-tarea")
    public ResponseEntity<Map<String, String>> subirTarea(
            @RequestParam("archivo") MultipartFile archivo,
            @RequestParam("tareaId") Long tareaId,
            @RequestHeader("X-Alumno-Email") String email) {

        try {
            String nombreArchivo = servicio.guardarArchivoTarea(archivo, tareaId, email);
            return ResponseEntity.ok(Map.of(
                    "message", "Archivo subido exitosamente",
                    "nombreArchivo", nombreArchivo
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}