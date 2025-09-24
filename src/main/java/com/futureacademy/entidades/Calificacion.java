package com.futureacademy.entidades;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name="calificaciones")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Calificacion {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional=false) @JoinColumn(name="inscripcion_id")
    private Inscripcion inscripcion;

    private Integer parcial; // 1,2,3...
    private Integer nota;    // 0-100
}
