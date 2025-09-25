package com.futureacademy.entidades;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="entregas_tarea",
        uniqueConstraints = @UniqueConstraint(columnNames = {"tarea_id","alumno_id"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EntregaTarea {

    public enum Estado { PENDIENTE, ENVIADO }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional=false) @JoinColumn(name="tarea_id")
    private Tarea tarea;

    @ManyToOne(optional=false) @JoinColumn(name="alumno_id")
    private Estudiante alumno;

    @Enumerated(EnumType.STRING)
    @Column(nullable=false)
    private Estado estado = Estado.PENDIENTE;

    private String nombreArchivo;
    private LocalDateTime fechaSubida;
}