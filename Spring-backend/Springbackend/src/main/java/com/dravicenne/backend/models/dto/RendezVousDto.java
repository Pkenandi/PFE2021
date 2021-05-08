package com.dravicenne.backend.models.dto;

import com.dravicenne.backend.enumeration.State;
import com.dravicenne.backend.models.RendezVous;
import com.dravicenne.backend.models.exception.RdvAlreadyTaken;
import lombok.Data;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDate;
import java.util.Objects;

@Data
public class RendezVousDto {
    private Long id;
    private LocalDate date;
    private String heure;
    private String status;
    private PlainPatientDto plainPatientDto;
    private PlainMedecinDto plainMedecinDto;

    public static RendezVousDto from(RendezVous rendezVous){
        RendezVousDto rendezVousDto = new RendezVousDto();

        if(Objects.isNull(rendezVous)){
            return null;
        }else{
            rendezVousDto.setId(rendezVous.getId());
            rendezVousDto.setDate(rendezVous.getDate());
            rendezVousDto.setHeure(rendezVous.getHeure());
            rendezVousDto.setStatus(rendezVous.getStatus());
            rendezVousDto.setPlainMedecinDto(PlainMedecinDto.from(rendezVous.getMedecin()));
            rendezVousDto.setPlainPatientDto(PlainPatientDto.from(rendezVous.getPatient()));


            return rendezVousDto;
        }
    }
}
