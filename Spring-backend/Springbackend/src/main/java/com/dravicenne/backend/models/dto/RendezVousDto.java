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
    private PlainPatientDto patientDto;
    private PlainMedecinDto medecinDto;

    public static RendezVousDto from(RendezVous rendezVous){
        RendezVousDto rendezVousDto = new RendezVousDto();

        rendezVousDto.setId(rendezVous.getId());
        rendezVousDto.setDate(rendezVous.getDate());
        rendezVousDto.setStatus(rendezVous.getStatus());
        if(Objects.nonNull(rendezVous.getPatient()) && Objects.nonNull(rendezVous.getMedecin())){
            rendezVousDto.setMedecinDto(PlainMedecinDto.from(rendezVous.getMedecin()));
            rendezVousDto.setPatientDto(PlainPatientDto.from(rendezVous.getPatient()));
        }

        return rendezVousDto;
    }
}
