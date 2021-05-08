package com.dravicenne.backend.models.dto;

import com.dravicenne.backend.models.Agenda;
import com.dravicenne.backend.models.Tache;
import com.dravicenne.backend.models.plaindto.PlainAgendaDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TacheDto {
    private Long id;
    private String heure;
    private LocalDate date;
    private String tache;
    private String description;
    private PlainAgendaDto plainAgendaDto;

    public static TacheDto from(Tache tache) {
        TacheDto tacheDto = new TacheDto();

        if (Objects.isNull(tache)) {
            return null;
        } else {
            tacheDto.setId(tache.getId());
            tacheDto.setTache(tache.getTache());
            tacheDto.setDescription(tache.getDescription());
            tacheDto.setHeure(tache.getHeure());
            tacheDto.setDate(tache.getDate());
            tacheDto.setPlainAgendaDto(PlainAgendaDto.from(tache.getAgenda()));


            return tacheDto;
        }
    }
}
