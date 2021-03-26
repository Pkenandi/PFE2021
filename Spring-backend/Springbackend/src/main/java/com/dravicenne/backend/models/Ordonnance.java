package com.dravicenne.backend.models;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Ordonnance {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer numero;
    private LocalDate date;

    @OneToOne( cascade = CascadeType.ALL)
    @JoinColumn( name = "idDossierMed")
    private DossierMedical dossier;
}
