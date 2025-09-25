package com.futureacademy.Controladores;

import com.futureacademy.dto.TareaDto;
import com.futureacademy.servicios.ServicioTarea;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tareas")
@RequiredArgsConstructor
public class ControladorTarea {

    private final ServicioTarea servicio;

    @GetMapping("/mias")
    public List<TareaDto> mias(@RequestHeader("X-Alumno-Email") String email) {
        return servicio.misTareas(email);
    }

    @PostMapping(
            path = "/{tareaId}/entregar",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Map<String, String> entregar(@RequestHeader("X-Alumno-Email") String email,
                                        @PathVariable Long tareaId,
                                        @RequestPart("archivo") MultipartFile archivo) throws Exception {
        // Guarda el archivo donde corresponda y obtén el nombre final:
        String nombreGuardado = archivo.getOriginalFilename(); // reemplaza por tu lógica real
        String nombre = servicio.entregarTarea(email, tareaId, nombreGuardado);
        return Map.of("nombreArchivo", nombre);
    }
}