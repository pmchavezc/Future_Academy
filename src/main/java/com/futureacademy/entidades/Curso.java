package com.futureacademy.entidades;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name="cursos")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Curso {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String codigo;

    @Column(nullable=false)
    private String nombre;

    private String horario;
    private String docente;
}
