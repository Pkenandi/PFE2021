package com.dravicenne.backend.models.plaindto;

import com.dravicenne.backend.models.Agenda;
import com.dravicenne.backend.models.dto.AgendaDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlainAgendaDto {
    private Long id;
    private String titre;

    public static PlainAgendaDto from(Agenda agenda){
        PlainAgendaDto plainAgendaDto = new PlainAgendaDto();

        plainAgendaDto.setId(agenda.getId());
        plainAgendaDto.setTitre(agenda.getTitre());

        return plainAgendaDto;
    }
}
