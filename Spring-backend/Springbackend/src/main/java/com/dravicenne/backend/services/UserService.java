package com.dravicenne.backend.services;

import com.dravicenne.backend.models.Medecin;
import com.dravicenne.backend.models.RendezVous;
import com.dravicenne.backend.models.User;
import com.dravicenne.backend.models.exception.NotFoundException;
import com.dravicenne.backend.models.exception.RdvAlreadyTaken;
import com.dravicenne.backend.repositories.MedecinRepository;
import com.dravicenne.backend.models.Patient;
import com.dravicenne.backend.repositories.PatientRepository;
import com.dravicenne.backend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final MedecinRepository medecinRepository;
    private final PatientRepository patientRepository;
    private final RendezVousService rendezVousService;

    // Users
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
    public User findUserByPassword(String password)
    {
        return this.userRepository.findUserByPassword(password);
    }
    public Optional<User> findById(Long id){
        return this.userRepository.findById(id);
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
    public Medecin connectToRendezVous(String cin, Long rdvId){
        Medecin medecin = this.medecinRepository.findMedecinBycin(cin);
        RendezVous rendezVous = this.rendezVousService.findById(rdvId);

        if(Objects.nonNull(rendezVous.getMedecin())){
            throw new RdvAlreadyTaken(rdvId, rendezVous.getMedecin().getCin());
        }else{
            medecin.connectToRendezVous(rendezVous);
            return medecin;
        }
    }
    public void acceptRendezVous(Long rdvId, RendezVous rendezVous){
        RendezVous rendezVousToAlter = this.rendezVousService.findById(rdvId);

        if(Objects.nonNull(rendezVousToAlter.getMedecin())){
            throw new NotFoundException(" Rendez-vous not found ");
        }else{
            this.rendezVousService.alterRendezVous(rdvId,rendezVousToAlter);
        }
    }
    public void rejectRendezVous(Long rdvId, RendezVous rendezVous){
        RendezVous rendezVousToAlter = this.rendezVousService.findById(rdvId);

        if(Objects.nonNull(rendezVousToAlter.getMedecin())){
            throw new NotFoundException(" Rendez-vous not found ");
        }else{
            this.rendezVousService.alterRendezVous(rdvId,rendezVousToAlter);
        }
    }
    // Patients

    public Patient findPatientByUsername(String username) {
        return this.patientRepository.findPatientByUsername(username);
    }
    public Patient findPatientByUsernameAndPassword(String username, String password) {
        return this.patientRepository.findPatientByUsernameAndPassword(username,password);
    }
    public List<Patient> findAllPatients()
    {
        return this.patientRepository.findAll();
    }
    public Patient updatePatient(Patient patient, String username) {
        Patient newPatient = this.patientRepository.findPatientByUsername(username);
        if(newPatient != null)
        {
            newPatient.setAge(patient.getAge());
            newPatient.setNom(patient.getNom());
            newPatient.setPrenom(patient.getPrenom());
            newPatient.setUsername(patient.getUsername());
            newPatient.setGroupeSang(patient.getGroupeSang());
            newPatient.setVille(patient.getVille());
            newPatient.setPhone(patient.getPhone());
            newPatient.setPassword(patient.getPassword());
            newPatient.setCpassword(patient.getPassword());
            newPatient.setDateNaiss(patient.getDateNaiss());
            newPatient.setEmail(patient.getEmail());

            return this.patientRepository.save(newPatient);
        }
       return null;
    }
    public Patient deletePatientByUsername(String username) {
        Patient patient = this.patientRepository.findPatientByUsername(username);

        if(patient == null)
        {
            throw new NotFoundException(" Patient not found");
        }else
        {
            this.patientRepository.delete(patient);
            return patient;
        }
    }
    public Patient addRendezVous(String username, Long RdvId){
        Patient patient = this.patientRepository.findPatientByUsername(username);
        RendezVous rendezVous = this.rendezVousService.findById(RdvId);

        if(Objects.nonNull(rendezVous.getPatient()))
        {
            throw new RdvAlreadyTaken(RdvId,rendezVous.getPatient().getUsername());
        }else{
            patient.addRendezVous(rendezVous);
            return patient;
        }
    }
    public Patient deleteRendezVous(String username, Long RdvId){
        Patient patient = this.patientRepository.findPatientByUsername(username);
        RendezVous rendezVous = this.rendezVousService.findById(RdvId);

        if(patient == null)
        {
            throw new NotFoundException(" Patient not found !");
        }else
        {
            patient.removeRendezVous(rendezVous);
            return patient;
        }
    }

}