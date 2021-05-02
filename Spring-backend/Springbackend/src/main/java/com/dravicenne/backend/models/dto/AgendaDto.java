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

    public static AgendaDto from(Agenda agenda){
        AgendaDto agendaDto = new AgendaDto();

        agendaDto.setId(agenda.getId());
        agendaDto.setTitre(agenda.getTitre());
        if(Objects.nonNull(agenda.getMedecin())){
            agendaDto.setMedecinDto(PlainMedecinDto.from(agenda.getMedecin()));
        }
        if(Objects.nonNull(agenda.getTaches())){
            agendaDto.setTacheDtoList(agenda.getTaches().stream().map(TacheDto::from).collect(Collectors.toList()));
        }

        return agendaDto;
    }

}
