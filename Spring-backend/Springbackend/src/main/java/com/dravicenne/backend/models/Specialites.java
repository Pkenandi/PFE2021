package com.dravicenne.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "Specialites")
public class Specialites implements Serializable {
    @Id
    @GeneratedValue ( strategy = GenerationType.IDENTITY)
    private Long id;
    private String specialite;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "medecin_Id")
    private List<Medecin> medecinList = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSpecialite() {
        return specialite;
    }

    public void setSpecialite(String specialite) {
        this.specialite = specialite;
    }

    public List<Medecin> getMedecinList() {
        return medecinList;
    }

    public void setMedecinList(List<Medecin> medecinList) {
        this.medecinList = medecinList;
    }
}
