package com.dravicenne.backend.models;

import com.dravicenne.backend.controllers.TacheController;
import com.dravicenne.backend.models.dto.AgendaDto;
import com.dravicenne.backend.models.dto.MedecinDto;
import com.dravicenne.backend.models.dto.PlainMedecinDto;
import com.dravicenne.backend.models.dto.TacheDto;
import com.dravicenne.backend.models.plaindto.PlainAgendaDto;
import com.fasterxml.jackson.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Entity
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "Agenda")
public class Agenda implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column( unique = true, nullable = false)
    private String titre;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "agenda_id")
    private List<Tache> taches = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medecin_Id")
    private Medecin medecin;

    // Methods

    public static Agenda from(AgendaDto agendaDto) {
        Agenda agenda = new Agenda();

        if (Objects.isNull(agendaDto)) {
            return null;
        } else {
            agenda.setId(agendaDto.getId());
            agenda.setTitre(agendaDto.getTitre());
            agenda.setMedecin(Medecin.ToPlainMedecin(agendaDto.getMedecinDto()));
            agenda.setTaches(agendaDto.getTacheDtoList().stream().map(Tache::from).collect(Collectors.toList()));

            return agenda;
        }
    }

    public static Agenda toPlainAgenda(PlainAgendaDto plainAgendaDto) {
        Agenda agenda = new Agenda();

        agenda.setId(plainAgendaDto.getId());
        agenda.setTitre(plainAgendaDto.getTitre());

        return agenda;
    }

    public void createTask(Tache tache) {
        this.taches.add(tache);
    }

    public void removeTask(Tache tache) {
        this.taches.add(tache);
    }

}