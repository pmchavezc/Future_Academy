package com.futureacademy.dto;

public record CursoDto (
        Long id,
        String codigo,
        String nombre,
        String horario,
        String docente) {}