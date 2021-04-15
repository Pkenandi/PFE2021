package com.dravicenne.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Ordonnance")
public class Ordonnance implements Serializable {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer numero;
    private LocalDate date;
//
//    @OneToOne( cascade = CascadeType.ALL)
//    @JoinColumn( name = "idDossierMed")
//    private DossierMedical dossier;
}
