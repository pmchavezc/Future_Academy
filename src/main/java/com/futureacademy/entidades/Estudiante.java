package com.futureacademy.entidades;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name="alumnos")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Estudiante {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, unique=true)
    private String email;

    @Column(nullable=false)
    private String nombre;

    @Column(nullable=false)
    private String contrasena;
}
