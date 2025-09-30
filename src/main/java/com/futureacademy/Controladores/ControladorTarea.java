package com.futureacademy.Controladores;

import com.futureacademy.dto.TareaDto;
import com.futureacademy.servicios.ServicioTarea;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api/tareas")
@RequiredArgsConstructor
public class ControladorTarea {

    private final ServicioTarea servicio;

    // ↓ Si prefieres parametrizarlo, usa @Value("${app.uploads.tareas}") String tareasDirProp;
    private final Path tareasDir = Paths.get("uploads", "tareas").toAbsolutePath().normalize();

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

        if (archivo == null || archivo.isEmpty()) {
            throw new IllegalArgumentException("No se recibió archivo o está vacío.");
        }

        // 1) Asegurar carpeta
        Files.createDirectories(tareasDir);

        // 2) Sanear nombre original
        String original = StringUtils.cleanPath(
                Optional.ofNullable(archivo.getOriginalFilename()).orElse("archivo")
        );
        // quitar rutas, caracteres raros
        original = original.replace("\\", "/");
        original = original.substring(original.lastIndexOf('/') + 1);
        original = original.replaceAll("[^a-zA-Z0-9._-]", "_");

        // 3) Generar un nombre único
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String unique = UUID.randomUUID().toString().substring(0, 8);
        String nombreGuardado = timestamp + "-" + unique + "-" + original;

        // 4) Guardar a disco
        Path destino = tareasDir.resolve(nombreGuardado);
        try (InputStream in = archivo.getInputStream()) {
            Files.copy(in, destino, StandardCopyOption.REPLACE_EXISTING);
        }

        // 5) Registrar la entrega en tu servicio con el nombre final
        String nombre = servicio.entregarTarea(email, tareaId, nombreGuardado);

        return Map.of("nombreArchivo", nombre, "ruta", destino.toString());
    }
}