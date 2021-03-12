package com.dravicenne.backend.users.medecin;

import com.dravicenne.backend.users.User;

import javax.persistence.Entity;


@Entity(name = "medecin")
public class Medecin extends User {

    private String specialite;
    private String autreSpecialites;

    public Medecin() {
    }

    public Medecin(String nom, String prenom, String email, String password, String confPassword, String status, String specialite, String autreSpecialites) {
        super(nom, prenom, email, password, confPassword, status);
        this.specialite = specialite;
        this.autreSpecialites = autreSpecialites;
    }

    public String getSpecialite() {
        return specialite;
    }

    public void setSpecialite(String specialite) {
        this.specialite = specialite;
    }

    public String getAutreSpecialites() {
        return autreSpecialites;
    }

    public void setAutreSpecialites(String autreSpecialites) {
        this.autreSpecialites = autreSpecialites;
    }
}
