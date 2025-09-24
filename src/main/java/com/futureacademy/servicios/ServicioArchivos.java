package com.futureacademy.servicios;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class ServicioArchivos {

    @Value("${app.upload.dir:uploads}")
    private String directorioSubida;

    public String guardarArchivoTarea(MultipartFile archivo, Long tareaId, String emailAlumno)
            throws IOException {

        // Validar archivo
        if (archivo.isEmpty()) {
            throw new RuntimeException("Archivo vacío");
        }

        // Crear directorio si no existe
        Path directorioPath = Paths.get(directorioSubida, "tareas", String.valueOf(tareaId));
        Files.createDirectories(directorioPath);

        // Generar nombre único para el archivo
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
        String emailLimpio = emailAlumno.split("@")[0];
        String extension = obtenerExtension(archivo.getOriginalFilename());
        String nombreArchivo = String.format("%s_%s_%s%s",
                emailLimpio, timestamp, "tarea", extension);

        // Guardar archivo
        Path archivoPath = directorioPath.resolve(nombreArchivo);
        Files.copy(archivo.getInputStream(), archivoPath, StandardCopyOption.REPLACE_EXISTING);

        return nombreArchivo;
    }

    private String obtenerExtension(String nombreArchivo) {
        if (nombreArchivo == null || !nombreArchivo.contains(".")) {
            return "";
        }
        return nombreArchivo.substring(nombreArchivo.lastIndexOf("."));
    }
}