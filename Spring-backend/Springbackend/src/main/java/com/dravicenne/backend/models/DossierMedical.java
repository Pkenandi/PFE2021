package com.dravicenne.backend.models;

import javax.persistence.*;
import java.util.List;

@Entity
public class DossierMedical {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer numero;
    private String antecedent;

    @OneToOne( cascade = CascadeType.ALL)
    @JoinColumn(name = "idPatient", nullable = false)
    private Patient patient;

    @OneToMany( cascade = CascadeType.ALL)
    @JoinColumn( name = "idMedecin")
    private List<Medecin> medecins;

    @OneToOne( cascade = CascadeType.ALL)
    @JoinColumn( name = "idOrdonnace")
    private Ordonnance ordonnance;

    public DossierMedical() {
    }

    public DossierMedical(Integer numero, String antecedent) {
        this.numero = numero;
        this.antecedent = antecedent;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getAntecedent() {
        return antecedent;
    }

    public void setAntecedent(String antecedent) {
        this.antecedent = antecedent;
    }

    @Override
    public String toString() {
        return "DossierMedical{" +
                "id=" + id +
                ", numero=" + numero +
                ", antecedent='" + antecedent + '\'' +
                '}';
    }
}
