package com.futureacademy.entidades;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name="inscripciones", uniqueConstraints=@UniqueConstraint(columnNames={"alumno_id","curso_id"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Inscripcion {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional=false) @JoinColumn(name="alumno_id")
    private Estudiante alumno;

    @ManyToOne(optional=false) @JoinColumn(name="curso_id")
    private Curso curso;
}
