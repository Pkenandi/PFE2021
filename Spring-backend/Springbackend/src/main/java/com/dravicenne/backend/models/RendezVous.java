package com.dravicenne.backend.models;

import com.dravicenne.backend.enumeration.State;
import com.dravicenne.backend.models.dto.MedecinDto;
import com.dravicenne.backend.models.dto.PatientDto;
import com.dravicenne.backend.models.dto.RendezVousDto;
import com.dravicenne.backend.models.plaindto.PlainRendezVousDto;
import com.fasterxml.jackson.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Entity(name = "RendezVous")
@ToString
@NoArgsConstructor
@AllArgsConstructor
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class RendezVous implements Serializable {
    @Id
    @GeneratedValue ( strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;
    private String heure;
    @Column(nullable = true)
    private String status;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn( name = "patient_Id")
    private Patient patient;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medecin_id")
    private Medecin medecin;

    public static RendezVous from(RendezVousDto rendezVousDto){
        RendezVous rendezVous = new RendezVous();

        rendezVous.setId(rendezVousDto.getId());
        rendezVous.setHeure(rendezVousDto.getHeure());
        rendezVous.setDate(rendezVousDto.getDate());
        rendezVous.setStatus(rendezVousDto.getStatus());

        return rendezVous;
    }

    public static RendezVous ToPlainRendezVous(PlainRendezVousDto plainRendezVousDto){
        RendezVous rendezVous = new RendezVous();

        rendezVous.setDate(plainRendezVousDto.getDate());
        rendezVous.setHeure(plainRendezVousDto.getHeure());
        rendezVous.setId(plainRendezVousDto.getId());
        rendezVous.setStatus(plainRendezVousDto.getStatus());

        return rendezVous;
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

    public String getHeure() {
        return heure;
    }

    public void setHeure(String heure) {
        this.heure = heure;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    //@JsonBackReference(value = "patient_rendezVous")
    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    //@JsonBackReference(value = "medecin_rendezVous")
    public Medecin getMedecin() {
        return medecin;
    }

    public void setMedecin(Medecin medecin) {
        this.medecin = medecin;
    }
}
