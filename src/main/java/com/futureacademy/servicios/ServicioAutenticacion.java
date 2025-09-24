package com.futureacademy.servicios;

import com.futureacademy.dto.SolicitudLogin;
import com.futureacademy.dto.RespuestaLogin;
import com.futureacademy.entidades.Estudiante;
import com.futureacademy.repositorios.RepositorioEstudiante;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ServicioAutenticacion {

    private final RepositorioEstudiante repoEstudiante;

    public RespuestaLogin login(SolicitudLogin req) {
        // Busca al estudiante en la base de datos por email
        Estudiante est = repoEstudiante.findByEmail(req.email())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Verifica la contraseña
        if (!est.getContrasena().equals(req.contrasena())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        // Devuelve la respuesta con los datos del estudiante
        return new RespuestaLogin(est.getId(), est.getNombre(), est.getEmail(), "estudiante", null);
    }
}
