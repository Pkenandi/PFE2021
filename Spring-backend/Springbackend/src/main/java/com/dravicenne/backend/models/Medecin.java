package com.dravicenne.backend.models;

import com.dravicenne.backend.enumeration.UserRole;
import com.dravicenne.backend.models.dto.MedecinDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@Entity(name = "medecin")
public class Medecin extends User implements Serializable {
    @Column(nullable = false, unique = true, updatable = false)
    private String cin;
    @Column(nullable = false)
    private String specialite;

    @OneToMany( cascade = CascadeType.ALL)
    @JoinColumn( name = "medId", referencedColumnName = "id")
    private List<RendezVous> rendezVous = new ArrayList<>();

//    @ManyToOne( cascade = CascadeType.ALL)
//    @JoinColumn( name = "idCons")
//    private Consultation consultation;
//
//    @ManyToOne( cascade = CascadeType.ALL)
//    @JoinColumn( name = "idDossier")
//    private DossierMedical dossierMedical;

    public Medecin() {
    }

    // Methods
    public void connectToRendezVous(RendezVous rendezVous){
        this.rendezVous.add(rendezVous);
    }

    public static Medecin from(MedecinDto medecinDto){
        Medecin medecin = new Medecin();

        medecin.setId(medecinDto.getId());
        medecin.setNom(medecinDto.getNom());
        medecin.setPrenom(medecinDto.getPrenom());
        medecin.setSpecialite(medecinDto.getSpecialite());
        medecin.setVille(medecinDto.getVille());
        medecin.setEmail(medecinDto.getEmail());
        medecin.setCin(medecinDto.getCin());
        medecin.setCpassword(medecinDto.getCpassword());
        medecin.setPassword(medecinDto.getPassword());
        medecin.setPhone(medecinDto.getPhone());

        return medecin;
    }

        @Override
    public String toString() {
        return "Medecin{" +
                "cin='" + cin + '\'' +
                ", specialite='" + specialite + '\'' +
                ", Id=" + Id +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", Ville='" + Ville + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", password='" + password + '\'' +
                ", Cpassword='" + Cpassword + '\'' +
                '}';
    }
}