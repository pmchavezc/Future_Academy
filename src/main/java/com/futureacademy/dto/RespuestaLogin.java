package com.futureacademy.dto;

public record RespuestaLogin(
        Long alumnoId,
        String nombre,
        String email,
        String rol,
        String token) {}