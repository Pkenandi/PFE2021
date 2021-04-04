package com.dravicenne.backend.models;

import javax.persistence.*;
import java.util.List;

@Entity
public class Specialites {
    @Id
    @GeneratedValue ( strategy = GenerationType.IDENTITY)
    private Long id;
    private String specialite;

//    @ManyToMany
//    @JoinColumn( name = "idmedecin")
//    private List<Medecin> medecins;
}
