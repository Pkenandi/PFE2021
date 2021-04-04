package com.dravicenne.backend.models;

import com.dravicenne.backend.enumeration.State;
import com.dravicenne.backend.models.dto.RendezVousDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RendezVous {
    @Id
    @GeneratedValue ( strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer numero;
    private LocalDate date;
    private String heure;
    private String status;
    @ManyToOne
    private Patient patient;
    @ManyToOne
    private Medecin medecin;

    public static RendezVous from(RendezVousDto rendezVousDto){
        RendezVous rendezVous = new RendezVous();

        rendezVous.setId(rendezVousDto.getId());
        rendezVous.setHeure(rendezVousDto.getHeure());
        rendezVous.setDate(rendezVousDto.getDate());
        rendezVous.setStatus(rendezVousDto.getStatus());
        rendezVous.setNumero(rendezVousDto.getNumero());

        return rendezVous;
    }

    @Override
    public String toString() {
        return "RendezVous{" +
                "id=" + id +
                ", numero=" + numero +
                ", date=" + date +
                ", heure='" + heure + '\'' +
                ", status=" + status +
                '}';
    }
}
