package com.dravicenne.backend.models;

import com.dravicenne.backend.enumeration.UserRole;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.Period;

@Entity
public class Patient extends User implements Serializable {
    @Column(unique = true, nullable = false)
    private String username;
    @Column(nullable = false)
    private String groupeSang;
    @Transient
    private Integer age;
    @Column(nullable = false)
    private LocalDate dateNaiss;

    @OneToOne( cascade = CascadeType.ALL)
    @JoinColumn( name = "idRdv")
    private RendezVous rendezVous;

    @OneToOne( cascade = CascadeType.ALL)
    @JoinColumn( name = "idCons")
    private Consultation consultation;

    @OneToOne ( cascade = CascadeType.ALL)
    @JoinColumn ( name = "idDossier")
    private DossierMedical dossierMedical;

    public Patient() {
    }

    public Patient(String nom, String prenom, String ville, String email,String groupeSang, String phone,LocalDate dateNaiss, String username, String password, String Cpassword) {
        super(nom, prenom, ville, email, phone, password, Cpassword);
        this.username = username;
        this.groupeSang = groupeSang;
        this.dateNaiss = dateNaiss;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getGroupeSang() {
        return groupeSang;
    }

    public void setGroupeSang(String groupeSang) {
        this.groupeSang = groupeSang;
    }

    public Integer getAge() {
        return Period.between(this.dateNaiss, LocalDate.now()).getYears();
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public LocalDate getDateNaiss() {
        return dateNaiss;
    }

    public void setDateNaiss(LocalDate dateNaiss) {
        this.dateNaiss = dateNaiss;
    }

    @Override
    public String toString() {
        return "Patient{" +
                "username='" + username + '\'' +
                ", groupeSang='" + groupeSang + '\'' +
                ", age=" + age +
                ", dateNaiss=" + dateNaiss +
                ", Id=" + Id +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", Ville='" + Ville + '\'' +
                ", email='" + email + '\'' +
                ", phone=" + phone +
                ", password='" + password + '\'' +
                ", Cpassword='" + Cpassword + '\'' +
                '}';
    }
}
