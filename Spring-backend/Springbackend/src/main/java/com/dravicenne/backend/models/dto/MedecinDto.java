package com.dravicenne.backend.models.dto;

import com.dravicenne.backend.models.Horraire;
import com.dravicenne.backend.models.Medecin;
import com.dravicenne.backend.models.Specialites;
import com.dravicenne.backend.models.User;
import com.dravicenne.backend.models.plaindto.PlainSpecialitesDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedecinDto extends User {
    private String cin;
    private String specialite;
    private List<Horraire> horraireList;
    private List<DossierDto> dossierDtos = new ArrayList<>();
    private List<PlainSpecialitesDto> plainSpecialitesDtos = new ArrayList<>();
    private AgendaDto agendaDto;

    public static MedecinDto from(Medecin medecin) {
        MedecinDto medecinDto = new MedecinDto();

        if (Objects.isNull(medecin)) {
            return null;
        } else {
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
            medecinDto.setPicture(medecin.getPicture());
            medecinDto.setToken(medecin.getToken());
            medecinDto.setHorraireList(medecin.getHorraire());
            medecinDto.setDossierDtos(medecin.getDossierMedicals().stream().map(DossierDto::from).collect(Collectors.toList()));
            medecinDto.setPlainSpecialitesDtos(medecin.getSpecialites().stream().map(PlainSpecialitesDto::ToPlainSpecialite).collect(Collectors.toList()));
            medecinDto.setAgendaDto(AgendaDto.from(medecin.getAgenda()));

            return medecinDto;
        }
    }
}
