package com.dravicenne.backend.models.dto;

import com.dravicenne.backend.models.Specialites;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data
public class SpecialitesDto {
    private Long id;
    private String specialite;
    private String description;
    private List<MedecinDto> medecinDtos = new ArrayList<>();

    public static SpecialitesDto from(Specialites specialites){
        SpecialitesDto specialitesDto = new SpecialitesDto();

        if(Objects.isNull(specialites)){
            return null;
        }else{
            specialitesDto.setSpecialite(specialites.getSpecialite());
            specialitesDto.setId(specialites.getId());
            specialitesDto.setDescription(specialites.getDescription());
            specialitesDto.setMedecinDtos(specialites.getMedecinList().stream().map(MedecinDto::from).collect(Collectors.toList()));

            return specialitesDto;
        }
    }

}
