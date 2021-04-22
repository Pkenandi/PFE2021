package com.dravicenne.backend.models;

import com.dravicenne.backend.models.dto.MedecinDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "Medecin")
public class Medecin extends User implements Serializable {
    @Column(nullable = false, unique = true)
    private String cin;
    @Column(nullable = false)
    private String specialite;

    @OneToOne( cascade = CascadeType.ALL)
    @JoinColumn( name = "agenda_Id")
    private Agenda agenda;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany( cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn( name = "rdv_Id")
    private List<RendezVous> rendezVous = new ArrayList<>();

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany( cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "cons_Id")
    private List<Consultation> consultation = new ArrayList<>();

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany( cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "dossier_Id")
    private List<DossierMedical> dossierMedicals = new ArrayList<>();

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToMany( cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "spec_Id")
    private List<Specialites> specialites = new ArrayList<>();


    // Methods
    public void connectToRendezVous(RendezVous rendezVous){
        this.rendezVous.add(rendezVous);
    }

    public static Medecin from(MedecinDto medecinDto){
        Medecin medecin = new Medecin();

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

        return medecin;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getSpecialite() {
        return specialite;
    }

    public void setSpecialite(String specialite) {
        this.specialite = specialite;
    }

    public Agenda getAgenda() {
        return agenda;
    }

    public void setAgenda(Agenda agenda) {
        this.agenda = agenda;
    }

    @JsonManagedReference(value = "medecin_rendezVous")
    public List<RendezVous> getRendezVous() {
        return rendezVous;
    }

    public void setRendezVous(List<RendezVous> rendezVous) {
        this.rendezVous = rendezVous;
    }

    @JsonManagedReference(value = "medecin_consultation")
    public List<Consultation> getConsultation() {
        return consultation;
    }

    public void setConsultation(List<Consultation> consultation) {
        this.consultation = consultation;
    }

    @JsonManagedReference(value = "medecin_dossierMedical")
    public List<DossierMedical> getDossierMedicals() {
        return dossierMedicals;
    }

    public void setDossierMedicals(List<DossierMedical> dossierMedicals) {
        this.dossierMedicals = dossierMedicals;
    }

    public List<Specialites> getSpecialites() {
        return specialites;
    }

    public void setSpecialites(List<Specialites> specialites) {
        this.specialites = specialites;
    }
}