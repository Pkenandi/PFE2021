package com.dravicenne.backend.models;

import com.dravicenne.backend.models.dto.DossierDto;
import com.dravicenne.backend.models.dto.PatientDto;
import com.dravicenne.backend.models.dto.PlainPatientDto;
import com.fasterxml.jackson.annotation.*;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@EqualsAndHashCode(callSuper = true)
@Entity
@ToString
@Table(name = "Patient")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "username")
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
    @JsonManagedReference(value = "dossier_patient")
    private DossierMedical dossierMedical;

    // Constructors

    public Patient() {
    }

    public Patient(String username, String groupeSang, LocalDate dateNaiss, List<RendezVous> rendezVousList, List<Consultation> consultations, DossierMedical dossierMedical) {
        this.username = username;
        this.groupeSang = groupeSang;
        this.dateNaiss = dateNaiss;
        this.rendezVousList = rendezVousList;
        this.consultations = consultations;
        this.dossierMedical = dossierMedical;
    }

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
    public void addDossier(DossierMedical dossierMedical){
        this.setDossierMedical(dossierMedical);
    }
    public void removeDossier(){
        this.setDossierMedical(null);
    }

    public static Patient ToPlainPatient(PlainPatientDto patientDto){
        Patient patient = new Patient();

        patient.setNom(patientDto.getNom());
        patient.setPrenom(patientDto.getPrenom());
        patient.setVille(patientDto.getVille());
        patient.setUsername(patientDto.getUsername());
        patient.setGroupeSang(patientDto.getGroupeSang());
        patient.setEmail(patientDto.getEmail());
        patient.setPhone(patientDto.getPhone());
        patient.setPassword(patientDto.getPassword());
        patient.setCpassword(patientDto.getCpassword());
        patient.setDateNaiss(patientDto.getDateNaiss());
        patient.setId(patientDto.getId());

        return patient;
    }

    public static Patient from(PatientDto patientDto){
        Patient patient = new Patient();

        if(Objects.isNull(patientDto)){
            return null;
        }else{
            patient.setToken(patientDto.getToken());
            patient.setUsername(patientDto.getUsername());
            patient.setNom(patientDto.getNom());
            patient.setPrenom(patientDto.getPrenom());
            patient.setGroupeSang(patientDto.getGroupeSang());
            patient.setAge(patientDto.getAge());
            patient.setDateNaiss(patientDto.getDateNaiss());
            patient.setVille(patientDto.getVille());
            patient.setId(patientDto.getId());
            patient.setPhone(patientDto.getPhone());
            patient.setEmail(patientDto.getEmail());
            patient.setPassword(patientDto.getPassword());
            patient.setCpassword(patientDto.getCpassword());
            patient.setDossierMedical(DossierMedical.from(patientDto.getDossierDto()));
            patient.setRendezVousList(patientDto.getRendezVousDtos().stream().map(RendezVous::from).collect(Collectors.toList()));

            return patient;
        }

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

    public Integer getAge() { return Period.between(this.dateNaiss, LocalDate.now()).getYears();
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public LocalDate getDateNaiss() {
        return dateNaiss;
    }

    public void setDateNaiss(LocalDate dateNaiss) {
        this.dateNaiss = dateNaiss;
    }

    public List<RendezVous> getRendezVousList() {
        return rendezVousList;
    }

    public void setRendezVousList(List<RendezVous> rendezVousList) {
        this.rendezVousList = rendezVousList;
    }

    public List<Consultation> getConsultations() {
        return consultations;
    }

    public void setConsultations(List<Consultation> consultations) {
        this.consultations = consultations;
    }

    public DossierMedical getDossierMedical() {
        return dossierMedical;
    }

    public void setDossierMedical(DossierMedical dossierMedical) {
        this.dossierMedical = dossierMedical;
    }
}
