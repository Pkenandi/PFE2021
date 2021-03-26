package com.dravicenne.backend.models;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
public class Consultation {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer numero;
    private LocalDate date;

    @OneToMany
    @JoinColumn( name = "idMedecin")
    private List<Medecin> medecins;

    @OneToMany( cascade = CascadeType.ALL)
    @JoinColumn( name = "idPatient")
    private List <Patient> patients;

    @OneToOne ( cascade = CascadeType.ALL)
    @JoinColumn ( name = "idRdv", nullable = false)
    private RendezVous rendezVous;


    public Consultation() {
    }

    public Consultation(Integer numero, LocalDate date) {
        this.numero = numero;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Consultation{" +
                "id=" + id +
                ", numero=" + numero +
                ", date=" + date +
                '}';
    }
}
