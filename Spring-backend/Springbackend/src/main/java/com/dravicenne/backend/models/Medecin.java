package com.dravicenne.backend.models;

import com.dravicenne.backend.models.dto.MedecinDto;
import com.dravicenne.backend.models.dto.PlainMedecinDto;
import com.fasterxml.jackson.annotation.*;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data
@Entity
@Table(name = "Medecin")
public class Medecin extends User implements Serializable {
    @Column(nullable = false, unique = true)
    private String cin;
    @Column(nullable = false)
    private String specialite;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "medecin_id")
    private List<Horraire> horraire = new ArrayList<>();

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToOne( cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn( name = "agenda_Id")
    private Agenda agenda;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn( name = "med_Id")
    private List<RendezVous> rendezVous = new ArrayList<>();

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "dossier_Id")
    private List<DossierMedical> dossierMedicals = new ArrayList<>();

    @JsonIgnore
    @JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler"})
    @ManyToMany(fetch = FetchType.LAZY)
    private List<Specialites> specialites = new ArrayList<>();


    // Methods

    public void connectToRendezVous(RendezVous rendezVous){
        this.rendezVous.add(rendezVous);
    }

    public void connectToDossier(DossierMedical dossierMedical){
        this.dossierMedicals.add(dossierMedical);
    }

    public void addSpecialite(Specialites specialites){
        this.specialites.add(specialites);
    }

    public void removeSpecialite(Specialites specialites){
        this.specialites.remove(specialites);
    }

    public void addHorraire(Horraire horraire){
        this.horraire.add(horraire);
    }

    public void removeHorraire(Horraire horraire){
        this.horraire.remove(horraire);
    }

    public static Medecin from(MedecinDto medecinDto){
        Medecin medecin = new Medecin();

        if(Objects.isNull(medecinDto)){
            return null;
        }else{
            medecin.setId(medecinDto.getId());
            medecin.setNom(medecinDto.getNom());
            medecin.setPrenom(medecinDto.getPrenom());
            medecin.setSpecialite(medecinDto.getSpecialite());
            medecin.setVille(medecinDto.getVille());
            medecin.setEmail(medecinDto.getEmail());
            medecin.setCin(medecinDto.getCin());
            medecin.setCpassword(medecinDto.getCpassword());
            medecin.setPassword(medecinDto.getPassword());
            medecin.setPhone(medecinDto.getPhone());
            medecin.setPicture(medecinDto.getPicture());

            return medecin;
        }
    }

    public static  Medecin ToPlainMedecin(PlainMedecinDto plainMedecinDto){
        Medecin medecin = new Medecin();

        if (Objects.isNull(plainMedecinDto)){
            return null;
        }else{
            medecin.setNom(plainMedecinDto.getNom());
            medecin.setPrenom(plainMedecinDto.getPrenom());
            medecin.setVille(plainMedecinDto.getVille());
            medecin.setEmail(plainMedecinDto.getEmail());
            medecin.setPhone(plainMedecinDto.getPhone());
            medecin.setSpecialite(plainMedecinDto.getSpecialite());
            medecin.setId(plainMedecinDto.getId());
            medecin.setPassword(plainMedecinDto.getPassword());
            medecin.setCpassword(plainMedecinDto.getCpassword());
            medecin.setCin(plainMedecinDto.getCin());
            medecin.setPicture(plainMedecinDto.getPicture());

            return medecin;

        }

    }

}