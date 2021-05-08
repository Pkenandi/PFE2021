package com.dravicenne.backend.models.dto;

import com.dravicenne.backend.models.Agenda;
import com.dravicenne.backend.models.plaindto.PlainTacheDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AgendaDto {
    private Long id;
    private String titre;
    private PlainMedecinDto medecinDto;
    private List<TacheDto> TacheDtoList = new ArrayList<>();

    public static AgendaDto from(Agenda agenda) {
        AgendaDto agendaDto = new AgendaDto();

        if (Objects.isNull(agenda)) {
            return null;
        } else {
            agendaDto.setId(agenda.getId());
            agendaDto.setTitre(agenda.getTitre());
            agendaDto.setMedecinDto(PlainMedecinDto.from(agenda.getMedecin()));
            agendaDto.setTacheDtoList(agenda.getTaches().stream().map(TacheDto::from).collect(Collectors.toList()));

            return agendaDto;
        }
    }

}
