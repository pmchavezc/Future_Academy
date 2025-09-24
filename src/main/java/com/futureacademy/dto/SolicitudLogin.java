package com.futureacademy.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record SolicitudLogin(
        @Email @NotBlank String email,
        @NotBlank String contrasena) {}
