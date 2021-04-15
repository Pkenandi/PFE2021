package com.dravicenne.backend.models;

import com.dravicenne.backend.models.dto.DossierDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DossierMedical implements Serializable {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    private String numero;
    private String antecedent;
    private String observation;
    private String prescription;

    // Relationships

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn( name = "patient_Id")
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medecin_Id")
    private Medecin medecin;

    public static DossierMedical from (DossierDto dossierDto){
        DossierMedical dossierMedical = new DossierMedical();

        dossierMedical.setAntecedent(dossierDto.getAntecedent());
        dossierMedical.setId(dossierDto.getId());
        dossierMedical.setNumero(dossierDto.getNumero());
        dossierMedical.setObservation(dossierDto.getObservation());
        dossierMedical.setPrescription(dossierDto.getPrescription());

        return dossierMedical;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getAntecedent() {
        return antecedent;
    }

    public void setAntecedent(String antecedent) {
        this.antecedent = antecedent;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    public String getPrescription() {
        return prescription;
    }

    public void setPrescription(String prescription) {
        this.prescription = prescription;
    }

    @JsonBackReference(value = "patient_dossierMedical")
    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    @JsonBackReference(value = "medecin_dossierMedical")
    public Medecin getMedecin() {
        return medecin;
    }

    public void setMedecin(Medecin medecin) {
        this.medecin = medecin;
    }
}