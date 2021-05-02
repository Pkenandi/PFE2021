package com.dravicenne.backend.models;

import com.dravicenne.backend.models.dto.TacheDto;
import com.dravicenne.backend.models.plaindto.PlainTacheDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ResponseBody
@ToString
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Tache implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String heure;
    private String tache;
    private String description;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tache")
    private Agenda agenda;

    public static Tache from(TacheDto tacheDto){
        Tache tache = new Tache();

        tache.setId(tacheDto.getId());
        tache.setTache(tacheDto.getTache());
        tache.setHeure(tacheDto.getHeure());
        tache.setDescription(tacheDto.getDescription());

        return tache;
    }

    public static Tache ToPlainTache(PlainTacheDto plainTacheDto){
        Tache tache = new Tache();

        tache.setId(plainTacheDto.getId());
        tache.setTache(plainTacheDto.getTache());
        tache.setDescription(plainTacheDto.getDescription());
        tache.setHeure(plainTacheDto.getHeure());

        return tache;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHeure() {
        return heure;
    }

    public void setHeure(String heure) {
        this.heure = heure;
    }

    public String getTache() {
        return tache;
    }

    public void setTache(String tache) {
        this.tache = tache;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    //@JsonBackReference(value = "agenda_tache")
    public Agenda getAgenda() {
        return agenda;
    }

    public void setAgenda(Agenda agenda) {
        this.agenda = agenda;
    }
}
