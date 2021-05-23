package com.dravicenne.backend.models.plaindto;

import com.dravicenne.backend.models.DossierMedical;
import com.dravicenne.backend.models.antecedent.Chirurgicaux;
import com.dravicenne.backend.models.antecedent.GynecoObstetricaux;
import com.dravicenne.backend.models.antecedent.Medicaux;
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
    private Medicaux antMed;
    private Chirurgicaux antCh;
    private String observation;
    private String prescription;


    public static PlainDossierDto from(DossierMedical medical){
        PlainDossierDto plainDossierDto = new PlainDossierDto();

        if(Objects.isNull(medical)){
            return null;
        }else{
            plainDossierDto.setAntMed(medical.getAntMed());
            plainDossierDto.setAntCh(medical.getAntCh());
            plainDossierDto.setId(medical.getId());
            plainDossierDto.setNumero(medical.getNumero());
            plainDossierDto.setObservation(medical.getObservation());
            plainDossierDto.setPrescription(medical.getPrescription());

            return plainDossierDto;
        }
    }
}
