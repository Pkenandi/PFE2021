package com.dravicenne.backend.users;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "users")
@Inheritance( strategy = InheritanceType.JOINED)
public abstract class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column( updatable = false )
    protected Long id;
    @Column(
            nullable = false
    )
    protected String nom;
    protected String prenom;

    @Column(unique = true,
            nullable = false
    )
    protected String email;
    @Column(
            nullable = false
    )
    protected String password;
    @Column(
            nullable = false
    )
    protected String confPassword;
    @Column(
            nullable = false
    )
    protected String status;

    public User() {
    }

    public User(Long id, String nom, String prenom, String email, String password, String confPassword, String status) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.password = password;
        this.confPassword = confPassword;
        this.status = status;
    }

    public User(String nom, String prenom, String email, String password, String confPassword, String status) {
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.password = password;
        this.confPassword = confPassword;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfPassword() {
        return confPassword;
    }

    public void setConfPassword(String confPassword) {
        this.confPassword = confPassword;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "User{ " +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", confPassword='" + confPassword + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
