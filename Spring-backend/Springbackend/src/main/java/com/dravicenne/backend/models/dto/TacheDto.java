package com.dravicenne.backend.models.dto;

import com.dravicenne.backend.models.Agenda;
import com.dravicenne.backend.models.Tache;
import com.dravicenne.backend.models.plaindto.PlainAgendaDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TacheDto {
    private Long id;
    private String heure;
    private String tache;
    private String description;
    private PlainAgendaDto plainAgendaDto;

    public static TacheDto from(Tache tache){
        TacheDto tacheDto = new TacheDto();

        tacheDto.setId(tache.getId());
        tacheDto.setTache(tache.getTache());
        tacheDto.setDescription(tache.getDescription());
        tacheDto.setHeure(tache.getHeure());
        if(Objects.nonNull(tache.getAgenda())){
            tacheDto.setPlainAgendaDto(PlainAgendaDto.from(tache.getAgenda()));
        }

        return tacheDto;
    }
}
