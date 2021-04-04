package com.dravicenne.backend.models.dto;

import com.dravicenne.backend.models.Medecin;
import com.dravicenne.backend.models.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlainMedecinDto extends User {
    private String cin;
    private String specialite;

    public static PlainMedecinDto from(Medecin medecin){
        PlainMedecinDto medecinDto = new PlainMedecinDto();
        medecinDto.setCin(medecin.getCin());
        medecinDto.setSpecialite(medecin.getSpecialite());
        medecinDto.setNom(medecin.getNom());

        return medecinDto;
    }
}
