package com.dravicenne.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "dossier_medical")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DossierMedical {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer numero;
    private String antecedent;

    // Relationships


    @Override
    public String toString() {
        return "DossierMedical{" +
                "id=" + id +
                ", numero=" + numero +
                ", antecedent='" + antecedent + '\'' +
                '}';
    }
}
