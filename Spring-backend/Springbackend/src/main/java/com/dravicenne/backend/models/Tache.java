package com.dravicenne.backend.models;

import com.dravicenne.backend.models.dto.TacheDto;
import com.dravicenne.backend.models.plaindto.PlainTacheDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ResponseBody
@ToString
@Data
public class Tache implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String heure;
    private LocalDate date;
    private String tache;
    private String description;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tache")
    private Agenda agenda;

    public static Tache from(TacheDto tacheDto){
        Tache tache = new Tache();

        if(Objects.isNull(tacheDto)){
            return null;
        }else{
            tache.setId(tacheDto.getId());
            tache.setTache(tacheDto.getTache());
            tache.setHeure(tacheDto.getHeure());
            tache.setDate(tacheDto.getDate());
            tache.setDescription(tacheDto.getDescription());

            return tache;
        }
    }

    public static Tache ToPlainTache(PlainTacheDto plainTacheDto){
        Tache tache = new Tache();

       if(Objects.isNull(plainTacheDto)){
           return null;
       }else{
           tache.setId(plainTacheDto.getId());
           tache.setTache(plainTacheDto.getTache());
           tache.setDescription(plainTacheDto.getDescription());
           tache.setHeure(plainTacheDto.getHeure());
           tache.setDate(plainTacheDto.getDate());

           return tache;
       }
    }

}
