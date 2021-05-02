package com.dravicenne.backend.models.plaindto;

import com.dravicenne.backend.models.Tache;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlainTacheDto {
    private Long id;
    private String heure;
    private String tache;
    private String description;

    public static PlainTacheDto from(Tache tache){
        PlainTacheDto plainTacheDto = new PlainTacheDto();

        plainTacheDto.setTache(tache.getTache());
        plainTacheDto.setId(tache.getId());
        plainTacheDto.setDescription(tache.getDescription());
        plainTacheDto.setHeure(tache.getHeure());

        return plainTacheDto;
    }
}
