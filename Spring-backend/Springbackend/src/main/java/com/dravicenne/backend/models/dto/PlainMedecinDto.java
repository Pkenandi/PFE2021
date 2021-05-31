package com.dravicenne.backend.models.dto;

import com.dravicenne.backend.models.Medecin;
import com.dravicenne.backend.models.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Objects;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlainMedecinDto extends User {
    private String cin;
    private String specialite;

    public static PlainMedecinDto from(Medecin medecin){
        PlainMedecinDto medecinDto = new PlainMedecinDto();

        if(Objects.isNull(medecin)){
            return null;
        }else{
            medecinDto.setCin(medecin.getCin());
            medecinDto.setSpecialite(medecin.getSpecialite());
            medecinDto.setNom(medecin.getNom());
            medecinDto.setPrenom(medecin.getPrenom());
            medecinDto.setPicture(medecin.getPicture());
            medecinDto.setVille(medecin.getVille());
            medecinDto.setCin(medecinDto.getCin());
            medecinDto.setEmail(medecin.getEmail());
            medecinDto.setId(medecin.getId());
            medecinDto.setPassword(medecin.getPassword());
            medecinDto.setCpassword(medecin.getCpassword());

            return medecinDto;
        }
    }
}
