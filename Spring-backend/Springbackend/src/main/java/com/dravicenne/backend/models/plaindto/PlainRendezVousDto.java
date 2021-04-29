package com.dravicenne.backend.models.plaindto;

import com.dravicenne.backend.models.RendezVous;
import com.dravicenne.backend.models.dto.RendezVousDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlainRendezVousDto {
    private Long id;
    private LocalDate date;
    private String heure;
    private String status;

    public static PlainRendezVousDto from(RendezVous rendezVous){
        PlainRendezVousDto plainRendezVousDto = new PlainRendezVousDto();

        plainRendezVousDto.setId(rendezVous.getId());
        plainRendezVousDto.setDate(rendezVous.getDate());
        plainRendezVousDto.setHeure(rendezVous.getHeure());
        plainRendezVousDto.setStatus(rendezVous.getStatus());

        return plainRendezVousDto;
    }
}
