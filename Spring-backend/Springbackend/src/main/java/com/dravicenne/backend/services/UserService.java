package com.dravicenne.backend.services;

import com.dravicenne.backend.models.Medecin;
import com.dravicenne.backend.models.User;
import com.dravicenne.backend.repositories.MedecinRepository;
import com.dravicenne.backend.models.Patient;
import com.dravicenne.backend.repositories.PatientRepository;
import com.dravicenne.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    MedecinRepository medecinRepository;

    @Autowired
    PatientRepository patientRepository;

    public void SaveUser(User user)
    {
        this.userRepository.save(user);
    }

    public List<User> getAllUser()
    {
        return this.userRepository.findAll();
    }

    public User findUserByEmail(String email)
    {
        return this.userRepository.findUserByEmail(email);
    }


    // Medecins

    public List<Medecin> findAllMedecins()
    {
        return this.medecinRepository.findAll();
    }
    public Medecin findMedecinByCinAndPassword(String cin, String password) { return this.medecinRepository.findMedecinByCinAndPassword(cin,password); }
    public Medecin findMedecinByCin(String cin)
    {
        return this.medecinRepository.findMedecinBycin(cin);
    }
    public List<Medecin> findMedecinByNom(String nom){ return this.medecinRepository.findMedecinByNom(nom);}
    public List<Medecin> findMedecinBySpecialite(String specialite) {return this.medecinRepository.findMedecinBySpecialite(specialite); }

    // Patients

    public Patient findPatientByUsername(String username)
    {
        return this.patientRepository.findPatientByUsername(username);
    }

    public Patient findPatientByUsernameAndPassword(String username, String password)
    {
        return this.patientRepository.findPatientByUsernameAndPassword(username,password);
    }

    public List<Patient> findAllPatients()
    {
        return this.patientRepository.findAll();
    }

}
