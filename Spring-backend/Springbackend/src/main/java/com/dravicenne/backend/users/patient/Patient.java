package com.dravicenne.backend.users.patient;

import com.dravicenne.backend.users.User;

import javax.persistence.Entity;
import javax.persistence.Transient;
import java.time.LocalDate;
import java.time.Period;

@Entity(name = "patient")
public class Patient extends User {

    @Transient
    private Integer age;
    private LocalDate DateNaiss;
    private String groupeSang;

    public Patient() {
    }

    public Patient(String nom, String prenom, String email, String password, String confPassword, String status, LocalDate dateNaiss, String groupeSang) {
        super(nom, prenom, email, password, confPassword, status);
        DateNaiss = dateNaiss;
        this.groupeSang = groupeSang;
    }


    public Integer getAge() {
        return Period.between(DateNaiss,LocalDate.now()).getYears();
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public LocalDate getDateNaiss() {
        return DateNaiss;
    }

    public void setDateNaiss(LocalDate dateNaiss) {
        DateNaiss = dateNaiss;
    }

    public String getGroupeSang() {
        return groupeSang;
    }

    public void setGroupeSang(String groupeSang) {
        this.groupeSang = groupeSang;
    }
}
