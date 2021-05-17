package com.dravicenne.backend.models;

import com.dravicenne.backend.models.dto.DossierDto;
import com.dravicenne.backend.models.dto.MedecinDto;
import com.dravicenne.backend.models.dto.PatientDto;
import com.dravicenne.backend.models.dto.PlainPatientDto;
import com.dravicenne.backend.models.plaindto.PlainDossierDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data
public class DossierMedical implements Serializable {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    private String numero;
    private String antecedent;
    private String observation;
    private String prescription;

    // Relationships

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn( name = "patient_Id")
    @JsonBackReference(value = "dossier_patient")
    private Patient patient;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "medecin_Id")
    private Medecin medecin;

    public static DossierMedical from (DossierDto dossierDto){
        DossierMedical dossierMedical = new DossierMedical();

        if(Objects.isNull(dossierDto)){
            return null;
        }else{
            dossierMedical.setAntecedent(dossierDto.getAntecedent());
            dossierMedical.setId(dossierDto.getId());
            dossierMedical.setNumero(dossierDto.getNumero());
            dossierMedical.setObservation(dossierDto.getObservation());
            dossierMedical.setPrescription(dossierDto.getPrescription());

            return dossierMedical;
        }
    }

    public static DossierMedical ToPlainDossier(PlainDossierDto plainDossierDto){
        DossierMedical dossierMedical = new DossierMedical();

        dossierMedical.setAntecedent(plainDossierDto.getAntecedent());
        dossierMedical.setNumero(plainDossierDto.getNumero());
        dossierMedical.setObservation(plainDossierDto.getObservation());
        dossierMedical.setPrescription(plainDossierDto.getPrescription());
        dossierMedical.setId(plainDossierDto.getId());

        return dossierMedical;
    }
}