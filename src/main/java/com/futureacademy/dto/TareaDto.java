package com.futureacademy.dto;

public record TareaDto(
        Long id,
        String curso,
        String titulo,
        String fechaEntrega,
        String estado,          // PENDIENTE/ENVIADO de EntregaTarea
        String archivoSubido    // puede ser null
) {}