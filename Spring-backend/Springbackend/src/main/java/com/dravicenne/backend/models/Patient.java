package com.dravicenne.backend.models;

import com.dravicenne.backend.enumeration.UserRole;
import com.dravicenne.backend.models.dto.PatientDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

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
@Data
public class Patient extends User implements Serializable {

    @Column(unique = true, nullable = false)
    private String username;
    @Column(nullable = false)
    private String groupeSang;
    @Transient
    private Integer age;
    private LocalDate dateNaiss;

    // Relationships

    @OneToMany( cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "pr_id", referencedColumnName = "id")
    private List<RendezVous> rendezVousList = new ArrayList<>();
// -------
    @OneToMany( cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn( name = "pc_id", referencedColumnName = "id")
    private List<Consultation> consultations = new ArrayList<>();
// -------


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

    public static Patient from(PatientDto patientDto){
        Patient patient = new Patient();

        patient.setNom(patientDto.getNom());
        patient.setPrenom(patientDto.getPrenom());
        patient.setVille(patientDto.getVille());
        patient.setUsername(patientDto.getUsername());
        patient.setGroupeSang(patientDto.getGroupeSang());
        patient.setAge(patientDto.getAge());
        patient.setDateNaiss(patientDto.getDateNaiss());
        patient.setEmail(patientDto.getEmail());
        patient.setPhone(patientDto.getPhone());
        patient.setPassword(patientDto.getPassword());
        patient.setCpassword(patientDto.getCpassword());

        return patient;
    }

    @Override
    public String toString() {
        return "Patient{" +
                "username='" + username + '\'' +
                ", groupeSang='" + groupeSang + '\'' +
                ", age=" + age +
                ", dateNaiss=" + dateNaiss +
                ", Id=" + Id +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", Ville='" + Ville + '\'' +
                ", email='" + email + '\'' +
                ", phone=" + phone +
                ", password='" + password + '\'' +
                ", Cpassword='" + Cpassword + '\'' +
                '}';
    }
}
