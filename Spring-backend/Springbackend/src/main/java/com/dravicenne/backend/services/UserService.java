package com.dravicenne.backend.services;

import com.dravicenne.backend.models.*;
import com.dravicenne.backend.models.exception.NotFoundException;
import com.dravicenne.backend.models.exception.RdvAlreadyTaken;
import com.dravicenne.backend.repositories.MedecinRepository;
import com.dravicenne.backend.repositories.PatientRepository;
import com.dravicenne.backend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final MedecinRepository medecinRepository;
    private final PatientRepository patientRepository;
    private final RendezVousService rendezVousService;
    private final DossierService dossierService;

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
    public User findById(Long id){
        return this.userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(" User not found !"));
    }

    // Medecins

    public List<Medecin> findAllMedecins()
    {
        return this.medecinRepository.findAll();
    }
    public Medecin findMedecinByCinAndPassword(String cin, String password) {
        return this.medecinRepository.findMedecinByCinAndPassword(cin,password);
    }
    public Medecin findMedecinByCin(String cin) {
        return this.medecinRepository.findMedecinBycin(cin);
    }
    public List<Medecin> findMedecinByNom(String nom){
        return this.medecinRepository.findMedecinByNom(nom);
    }
    public Medecin updateMedecin(Medecin medecin, String cin){
        Medecin medToUpdate = this.medecinRepository.findMedecinBycin(cin);

        if(medToUpdate != null){
            medToUpdate.setCin(medecin.getCin());
            medToUpdate.setSpecialite(medecin.getSpecialite());
            medToUpdate.setNom(medecin.getNom());
            medToUpdate.setPrenom(medecin.getPrenom());
            medToUpdate.setVille(medecin.getVille());
            medToUpdate.setPhone(medecin.getPhone());
            medToUpdate.setPassword(medecin.getPassword());
            medToUpdate.setCpassword(medecin.getPassword());
            medToUpdate.setEmail(medecin.getEmail());

            return this.medecinRepository.save(medToUpdate);
        }
        return null;
    }
    public List<Medecin> findMedecinBySpecialite(String specialite) {
        return this.medecinRepository.findMedecinBySpecialite(specialite);
    }
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

    // Patients

    public Patient findPatientByUsername(String username) {
        return this.patientRepository.findPatientByUsername(username);
    }
    public Patient findPatientByUsernameAndPassword(String username, String password) {
        return this.patientRepository.findPatientByUsernameAndPassword(username,password);
    }
    public List<Patient> findAllPatients()
    {
        return new ArrayList<>(this.patientRepository.findAll());
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
            rendezVous.setPatient(patient);
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
    public Patient addDossierMedical(String username, Long dossierId) {
        Patient patient = this.patientRepository.findPatientByUsername(username);
        DossierMedical dossierMedical = this.dossierService.findById(dossierId);

        if(Objects.nonNull(dossierMedical.getPatient())){
            throw new NotFoundException(" Dossier already taken ");
        }else{
            patient.setDossierMedical(dossierMedical);
            dossierMedical.setPatient(patient);
            return patient;
        }
    }
    public Patient deleteDossierMedical(String username, Long id){
        Patient patient = this.patientRepository.findPatientByUsername(username);
        DossierMedical dossierMedical = this.dossierService.findById(id);

        if(Objects.nonNull(dossierMedical.getPatient())){
            throw new NotFoundException(" Dossier not found ");
        }else{
            patient.setDossierMedical(null);
            this.dossierService.disablePatientId(id);
            return patient;
        }
    }
    public Patient findPatientWithRdv(String username) {
        Patient patient = this.patientRepository.findPatientByUsername(username);
        if(patient != null){
            if(patient.getRendezVousList().isEmpty()){
                return null;
            }else{
                return patient;
            }
        }
        return null;
    }
}