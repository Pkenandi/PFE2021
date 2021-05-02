package com.dravicenne.backend.models;

import com.dravicenne.backend.models.dto.MedecinDto;
import com.dravicenne.backend.models.dto.SpecialiteDto;
import com.fasterxml.jackson.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data
@Table(name = "Specialites")
public class Specialites implements Serializable {
    @Id
    @GeneratedValue ( strategy = GenerationType.IDENTITY)
    private Long id;
    private String specialite;
    private String description;
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "medecin_Specialite",
            joinColumns = @JoinColumn(name = "specialite_id"),
            inverseJoinColumns = @JoinColumn(name = "medecin_id")
    )
    private List<Medecin> medecinList = new ArrayList<>();

    public void addMedecin(Medecin medecin){
        this.medecinList.add(medecin);
    }

    public void removeMedecin(Medecin medecin){
        this.medecinList.remove(medecin);
    }


}
