package com.dravicenne.backend.models.plaindto;

import com.dravicenne.backend.models.Medecin;
import com.dravicenne.backend.models.User;
import com.dravicenne.backend.models.dto.MedecinDto;
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

    public static PlainMedecinDto from (Medecin medecin){
        PlainMedecinDto plainMedecinDto = new PlainMedecinDto();

       if(Objects.isNull(medecin)){
           return null;
       }else{
           plainMedecinDto.setId(medecin.getId());
           plainMedecinDto.setNom(medecin.getNom());
           plainMedecinDto.setPrenom(medecin.getPrenom());
           plainMedecinDto.setSpecialite(medecin.getSpecialite());
           plainMedecinDto.setVille(medecin.getVille());
           plainMedecinDto.setEmail(medecin.getEmail());
           plainMedecinDto.setCin(medecin.getCin());
           plainMedecinDto.setCpassword(medecin.getCpassword());
           plainMedecinDto.setPassword(medecin.getPassword());
           plainMedecinDto.setPhone(medecin.getPhone());
           plainMedecinDto.setPicture(medecin.getPicture());

           return plainMedecinDto;
       }
    }
}
