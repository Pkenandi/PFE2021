package com.dravicenne.backend.models.dto;

import com.dravicenne.backend.models.Agenda;
import com.dravicenne.backend.models.Medecin;
import com.dravicenne.backend.models.Specialites;
import com.dravicenne.backend.models.User;
import com.dravicenne.backend.models.plaindto.PlainDossierDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedecinDto extends User {
    private String cin;
    private String specialite;
    private List<DossierDto> plainDossierDtos = new ArrayList<>();
    private List<Specialites> specialitesList = new ArrayList<>();
    private Agenda agenda;

    public static MedecinDto from (Medecin medecin){
        MedecinDto medecinDto = new MedecinDto();

        medecinDto.setId(medecin.getId());
        medecinDto.setNom(medecin.getNom());
        medecinDto.setPrenom(medecin.getPrenom());
        medecinDto.setSpecialite(medecin.getSpecialite());
        medecinDto.setVille(medecin.getVille());
        medecinDto.setEmail(medecin.getEmail());
        medecinDto.setCin(medecin.getCin());
        medecinDto.setCpassword(medecin.getCpassword());
        medecinDto.setPassword(medecin.getPassword());
        medecinDto.setPhone(medecin.getPhone());
        medecinDto.setPlainDossierDtos(medecin.getDossierMedicals().stream().map(DossierDto::from).collect(Collectors.toList()));
        medecinDto.setSpecialitesList(medecin.getSpecialites());
        medecinDto.setAgenda(medecin.getAgenda());

        return medecinDto;
    }
}
