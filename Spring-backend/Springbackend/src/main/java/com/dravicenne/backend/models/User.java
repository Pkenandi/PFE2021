package com.dravicenne.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "user")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long Id;
    @Column(nullable = false)
    protected String nom;
    @Column(nullable = false)
    protected String prenom;
    @Column(nullable = false)
    protected String Ville;
    @Column(nullable = false, unique = true)
    protected String email;
    @Column(nullable = false)
    protected String phone;
    protected String password;
    protected String Cpassword;
    protected String Token;

}
