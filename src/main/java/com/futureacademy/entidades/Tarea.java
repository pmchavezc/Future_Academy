package com.futureacademy.entidades;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity @Table(name="tareas")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Tarea {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional=false) @JoinColumn(name="curso_id")
    private Curso curso;

    private String titulo;
    private LocalDate fechaEntrega;

}