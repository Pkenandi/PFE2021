package com.dravicenne.backend.models.dto;

import com.dravicenne.backend.models.DossierMedical;
import com.dravicenne.backend.models.Medecin;
import com.dravicenne.backend.models.Patient;
import com.dravicenne.backend.models.antecedent.Chirurgicaux;
import com.dravicenne.backend.models.antecedent.GynecoObstetricaux;
import com.dravicenne.backend.models.antecedent.Medicaux;
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
    private Medicaux antMed;
    private Chirurgicaux antCh;
    private String observation;
    private String prescription;
    private PlainPatientDto plainPatientDto;
    private PlainMedecinDto plainMedecinDto;


    public static DossierDto from(DossierMedical dossierMedical) {
        DossierDto dossierDto = new DossierDto();

        if (Objects.isNull(dossierMedical)) {
            return null;
        } else {
            dossierDto.setAntMed(dossierMedical.getAntMed());
            dossierDto.setAntCh(dossierMedical.getAntCh());
            dossierDto.setId(dossierMedical.getId());
            dossierDto.setNumero(dossierMedical.getNumero());
            dossierDto.setObservation(dossierMedical.getObservation());
            dossierDto.setPrescription(dossierMedical.getPrescription());
            dossierDto.setPlainMedecinDto(PlainMedecinDto.from(dossierMedical.getMedecin()));
            dossierDto.setPlainPatientDto(PlainPatientDto.from(dossierMedical.getPatient()));

            return dossierDto;
        }
    }
}
