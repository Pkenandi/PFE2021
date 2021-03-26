package com.dravicenne.backend.models;

import com.dravicenne.backend.enumeration.UserRole;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity(name = "medecin")
public class Medecin extends User implements Serializable {
    @Column(nullable = false, unique = true, updatable = false)
    private String cin;
    @Column(nullable = false)
    private String specialite;

    @ManyToOne( cascade = CascadeType.ALL)
    @JoinColumn( name = "idRdv")
    private RendezVous rendezVous;

    @ManyToOne( cascade = CascadeType.ALL)
    @JoinColumn( name = "idCons")
    private Consultation consultation;

    @ManyToOne( cascade = CascadeType.ALL)
    @JoinColumn( name = "idDossier")
    private DossierMedical dossierMedical;

    public Medecin() {
    }

    public Medecin(String nom, String prenom, String ville, String email, String phone, String password, String cpassword, String cin, String specialite) {
        super(nom, prenom, ville, email, phone, password, cpassword);
        this.cin = cin;
        this.specialite = specialite;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getSpecialite() {
        return specialite;
    }

    public void setSpecialite(String specialite) {
        this.specialite = specialite;
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
