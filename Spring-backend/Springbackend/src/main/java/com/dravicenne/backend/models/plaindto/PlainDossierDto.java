package com.dravicenne.backend.models.plaindto;

import com.dravicenne.backend.models.DossierMedical;
import com.dravicenne.backend.models.dto.DossierDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlainDossierDto {
    private Long id;
    private String numero;
    private String antecedent;
    private String observation;
    private String prescription;


    public static PlainDossierDto from(DossierMedical dossierMedical){
        PlainDossierDto plainDossierDto = new PlainDossierDto();

        plainDossierDto.setAntecedent(dossierMedical.getAntecedent());
        plainDossierDto.setId(dossierMedical.getId());
        plainDossierDto.setNumero(dossierMedical.getNumero());
        plainDossierDto.setObservation(dossierMedical.getObservation());
        plainDossierDto.setPrescription(dossierMedical.getPrescription());

        return plainDossierDto;
    }
}
