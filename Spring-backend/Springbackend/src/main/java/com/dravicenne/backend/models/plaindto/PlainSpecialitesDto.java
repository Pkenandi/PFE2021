package com.dravicenne.backend.models.plaindto;

import com.dravicenne.backend.models.Specialites;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlainSpecialitesDto {
    private Long id;
    private String specialite;
    private String description;

    public static PlainSpecialitesDto ToPlainSpecialite(Specialites specialites){
        PlainSpecialitesDto plainSpecialitesDto = new PlainSpecialitesDto();
        if(Objects.isNull(specialites)){
            return null;
        }else
        {
            plainSpecialitesDto.setSpecialite(specialites.getSpecialite());
            plainSpecialitesDto.setId(specialites.getId());
            plainSpecialitesDto.setDescription(specialites.getDescription());

            return plainSpecialitesDto;
        }
    }
}
