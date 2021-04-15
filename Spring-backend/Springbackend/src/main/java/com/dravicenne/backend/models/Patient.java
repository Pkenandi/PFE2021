package com.dravicenne.backend.models;

import com.dravicenne.backend.enumeration.UserRole;
import com.dravicenne.backend.models.dto.PatientDto;
import com.dravicenne.backend.models.dto.PlainPatientDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "Patient")
public class Patient extends User implements Serializable {

    @Column(unique = true, nullable = false)
    private String username;
    @Column(nullable = false)
    private String groupeSang;
    @Transient
    private Integer age;
    private LocalDate dateNaiss;

    // Relationships

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany( cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "rendezVous_Id")
    private List<RendezVous> rendezVousList = new ArrayList<>();
// -------

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany( cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "consultation_Id")
    private List<Consultation> consultations = new ArrayList<>();
// -------

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToOne( cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "dossier_Id")
    private DossierMedical dossierMedical;

    //Methods
    public void addRendezVous(RendezVous rendezVous) {
         this.rendezVousList.add(rendezVous);
    }
    public void removeRendezVous( RendezVous rendezVous){
        this.rendezVousList.remove(rendezVous);
    }
    // ---------------------------------
    public void addConsultation(Consultation consultation){
        this.consultations.add(consultation);
    }
    public void removeConsultation(Consultation consultation){
        this.consultations.remove(consultation);
    }

    public static Patient from(PlainPatientDto patientDto){
        Patient patient = new Patient();

        patient.setNom(patientDto.getNom());
        patient.setPrenom(patientDto.getPrenom());
        patient.setVille(patientDto.getVille());
        patient.setUsername(patientDto.getUsername());
        patient.setGroupeSang(patientDto.getGroupeSang());
        patient.setEmail(patientDto.getEmail());
        patient.setPhone(patientDto.getPhone());

        return patient;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getGroupeSang() {
        return groupeSang;
    }

    public void setGroupeSang(String groupeSang) {
        this.groupeSang = groupeSang;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = Period.between(LocalDate.now(), dateNaiss).getYears();
    }

    public LocalDate getDateNaiss() {
        return dateNaiss;
    }

    public void setDateNaiss(LocalDate dateNaiss) {
        this.dateNaiss = dateNaiss;
    }

    @JsonManagedReference(value = "patient_rendezVous")
    public List<RendezVous> getRendezVousList() {
        return rendezVousList;
    }

    public void setRendezVousList(List<RendezVous> rendezVousList) {
        this.rendezVousList = rendezVousList;
    }

    @JsonManagedReference(value = "patient_consultation")
    public List<Consultation> getConsultations() {
        return consultations;
    }

    public void setConsultations(List<Consultation> consultations) {
        this.consultations = consultations;
    }

    @JsonManagedReference(value = "patient_dossierMedical")
    public DossierMedical getDossierMedical() {
        return dossierMedical;
    }

    public void setDossierMedical(DossierMedical dossierMedical) {
        this.dossierMedical = dossierMedical;
    }
}
