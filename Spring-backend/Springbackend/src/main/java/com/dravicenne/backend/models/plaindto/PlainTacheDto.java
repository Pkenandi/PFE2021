package com.dravicenne.backend.models.plaindto;

import com.dravicenne.backend.models.Tache;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlainTacheDto {
    private Long id;
    private String heure;
    private String tache;
    private LocalDate date;
    private String description;

    public static PlainTacheDto from(Tache tache){
        PlainTacheDto plainTacheDto = new PlainTacheDto();

        if(Objects.isNull(tache)){
            return null;
        }else{
            plainTacheDto.setTache(tache.getTache());
            plainTacheDto.setId(tache.getId());
            plainTacheDto.setDescription(tache.getDescription());
            plainTacheDto.setHeure(tache.getHeure());
            plainTacheDto.setDate(tache.getDate());

            return plainTacheDto;
        }
    }
}
