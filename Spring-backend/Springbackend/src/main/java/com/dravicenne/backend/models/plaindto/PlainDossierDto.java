package com.dravicenne.backend.models.plaindto;

import com.dravicenne.backend.models.DossierMedical;
import com.dravicenne.backend.models.dto.DossierDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlainDossierDto {
    private Long id;
    private String numero;
    private String antecedent;
    private String observation;
    private String prescription;


    public static PlainDossierDto from(DossierMedical medical){
        PlainDossierDto plainDossierDto = new PlainDossierDto();

        if(Objects.isNull(medical)){
            return null;
        }else{
            plainDossierDto.setAntecedent(medical.getAntecedent());
            plainDossierDto.setId(medical.getId());
            plainDossierDto.setNumero(medical.getNumero());
            plainDossierDto.setObservation(medical.getObservation());
            plainDossierDto.setPrescription(medical.getPrescription());

            return plainDossierDto;
        }
    }
}
