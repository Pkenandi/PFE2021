package com.dravicenne.backend.models.dto;

import com.dravicenne.backend.models.DossierMedical;
import com.dravicenne.backend.models.Medecin;
import com.dravicenne.backend.models.Patient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DossierDto {
    private Long id;
    private String numero;
    private String antecedent;
    private String observation;
    private String prescription;
    private PlainPatientDto plainPatientDto;
    private PlainMedecinDto plainMedecinDto;


    public static DossierDto from(DossierMedical dossierMedical){
        DossierDto dossierDto = new DossierDto();

        dossierDto.setAntecedent(dossierMedical.getAntecedent());
        dossierDto.setId(dossierMedical.getId());
        dossierDto.setNumero(dossierMedical.getNumero());
        dossierDto.setObservation(dossierMedical.getObservation());
        dossierDto.setPrescription(dossierMedical.getPrescription());
        if(Objects.nonNull(dossierMedical.getMedecin())){
            dossierDto.setPlainMedecinDto(PlainMedecinDto.from(dossierMedical.getMedecin()));
        }
        if(Objects.nonNull(dossierMedical.getPatient())){
            dossierDto.setPlainPatientDto(PlainPatientDto.from(dossierMedical.getPatient()));
        }

        return dossierDto;
    }
}
