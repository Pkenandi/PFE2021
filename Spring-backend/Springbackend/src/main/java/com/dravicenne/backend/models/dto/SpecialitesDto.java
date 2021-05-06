package com.dravicenne.backend.models.dto;

import com.dravicenne.backend.models.Medecin;
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
public class SpecialiteDto {
    private Long id;
    private String specialite;
    private String description;
    private List<MedecinDto> medecinDtos = new ArrayList<>();

    public static SpecialiteDto from(Specialites specialites){
        SpecialiteDto specialiteDto = new SpecialiteDto();

        if(Objects.isNull(specialites)){
            return null;
        }else{
            specialiteDto.setSpecialite(specialites.getSpecialite());
            specialiteDto.setId(specialites.getId());
            specialiteDto.setDescription(specialites.getDescription());
            specialiteDto.setMedecinDtos(specialites.getMedecinList().stream().map(MedecinDto::from).collect(Collectors.toList()));

            return specialiteDto;
        }
    }

}
