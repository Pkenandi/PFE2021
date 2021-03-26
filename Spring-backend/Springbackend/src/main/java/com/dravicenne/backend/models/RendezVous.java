package com.dravicenne.backend.models;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
public class RendezVous {
    @Id
    @GeneratedValue ( strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer numero;
    private LocalDate date;
    private String heure;
    private boolean status;

    @OneToMany( cascade = CascadeType.ALL)
    @JoinColumn( name = "idPatient")
    private List<Patient> patients;

    @OneToMany( cascade = CascadeType.ALL)
    @JoinColumn( name = "idMedecin")
    private List<Medecin> medecins;

    @OneToOne( cascade = CascadeType.ALL)
    @JoinColumn( name = "idCons")
    private Consultation consultation;

    public RendezVous() {
    }

    public RendezVous(Integer numero, LocalDate date, String heure, boolean status) {
        this.numero = numero;
        this.date = date;
        this.heure = heure;
        this.status = status;
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

    public String getHeure() {
        return heure;
    }

    public void setHeure(String heure) {
        this.heure = heure;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "RendezVous{" +
                "id=" + id +
                ", numero=" + numero +
                ", date=" + date +
                ", heure='" + heure + '\'' +
                ", status=" + status +
                '}';
    }
}
