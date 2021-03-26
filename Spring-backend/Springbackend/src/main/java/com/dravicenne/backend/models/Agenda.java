package com.dravicenne.backend.models;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Agenda {
    @Id
    @GeneratedValue ( strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;
    private String heureDebut;
    private String heureFin;

//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn( name = "idmedecin")
//    private Medecin medecin;


    public Agenda() {
    }

    public Agenda(LocalDate date, String heureDebut, String heureFin) {
        this.date = date;
        this.heureDebut = heureDebut;
        this.heureFin = heureFin;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getHeureDebut() {
        return heureDebut;
    }

    public void setHeureDebut(String heureDebut) {
        this.heureDebut = heureDebut;
    }

    public String getHeureFin() {
        return heureFin;
    }

    public void setHeureFin(String heureFin) {
        this.heureFin = heureFin;
    }

    @Override
    public String toString() {
        return "Agenda{" +
                "id=" + id +
                ", date=" + date +
                ", heureDebut='" + heureDebut + '\'' +
                ", heureFin='" + heureFin + '\'' +
                '}';
    }
}
