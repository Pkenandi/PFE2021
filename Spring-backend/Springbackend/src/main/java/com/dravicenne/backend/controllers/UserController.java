package com.dravicenne.backend.controllers;

import com.dravicenne.backend.models.Horraire;
import com.dravicenne.backend.models.Medecin;
import com.dravicenne.backend.models.Patient;
import com.dravicenne.backend.models.User;
import com.dravicenne.backend.models.dto.*;
import com.dravicenne.backend.models.login.LoginMedecin;
import com.dravicenne.backend.models.login.LoginPatient;
import com.dravicenne.backend.services.DossierService;
import com.dravicenne.backend.services.HorraireService;
import com.dravicenne.backend.services.MailService;
import com.dravicenne.backend.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@ResponseBody
@RestController
@AllArgsConstructor
@RequestMapping(path = "user")
public class UserController {

    private final UserService userService;
    private final DossierService dossierService;
    private final MailService mailService;
    private final HorraireService horraireService;
    private static final SecureRandom secureRandom = new SecureRandom(); //threadsafe
    private static final Base64.Encoder base64Encoder = Base64.getUrlEncoder(); //threadsafe

    private String getJWTToken() {
        byte[] randomBytes = new byte[100];
        secureRandom.nextBytes(randomBytes);
        return base64Encoder.encodeToString(randomBytes);
    }

    // Register
    @PostMapping(value = "/patient/register")
    public ResponseEntity<String> register(@RequestBody PatientDto patientDto) throws Exception {
        String bodyEmail = patientDto.getEmail();
        String bodyUsername = patientDto.getUsername();

        if (bodyEmail != null && !"".equals(bodyEmail)) {
            User userEmail = this.userService.findUserByEmail(bodyEmail);
            Patient patientUsername = this.userService.findPatientByUsername(bodyUsername);

            if (userEmail != null)
                return new ResponseEntity<String>("Email " + userEmail + " already taken", HttpStatus.CONFLICT);
            else if (patientUsername != null)
                return new ResponseEntity<String>(" Username " + bodyUsername + " already taken", HttpStatus.CONFLICT);
            else {
                this.userService.SaveUser(Patient.from(patientDto));
                return new ResponseEntity<>("User registered successfully ", HttpStatus.OK);
            }

        } else {
            throw new Exception(" empty field ");
        }
    }

    @PostMapping(value = "/medecin/register")
    public ResponseEntity<String> register(@RequestBody MedecinDto medecinDto) throws Exception {
        String bodyEmail = medecinDto.getEmail();
        String bodyCin = medecinDto.getCin();

        if (bodyEmail != null && !"".equals(bodyEmail)) {
            User userEmail = this.userService.findUserByEmail(bodyEmail);
            Medecin medecinCin = this.userService.findMedecinByCin(bodyCin);

            if (userEmail != null)
                return new ResponseEntity<String>("Email " + userEmail + " already taken", HttpStatus.CONFLICT);
            else if (medecinCin != null)
                return new ResponseEntity<String>(" Cin " + bodyCin + " already taken", HttpStatus.CONFLICT);
            else {
                this.userService.SaveUser(Medecin.from(medecinDto));
                return new ResponseEntity<String>("User registered successfully !/", HttpStatus.OK);
            }

        } else {
            throw new Exception(" empty field ");
        }
    }

    // Login

    @PostMapping(value = "/patient/login")
    public PatientDto PatientLogin(@RequestBody LoginPatient patient) throws Exception {
        String bodyUsername = patient.getUsername();
        String bodyPassword = patient.getPassword();
        String token;

        if (bodyPassword != null && bodyUsername != null) {
            Patient logData = this.userService.findPatientByUsername(bodyUsername);
            if (logData != null) {
                if (logData.getUsername().equals(bodyUsername) && logData.getPassword().equals(bodyPassword)) {
                    token = getJWTToken();
                    logData.setToken(token);
                    return PatientDto.from(logData);
                } else {
                    throw new Exception(" User not found");
                }
            } else
                throw new Exception(" User not found ");
        } else {
            throw new Exception(" Empty field !");
        }
    }

    @PostMapping(value = "/medecin/login")
    public MedecinDto MedecinLogin(@RequestBody LoginMedecin medecin) throws Exception {
        String bodyCin = medecin.getCin();
        String bodyPassword = medecin.getPassword();

        if (bodyPassword != null && bodyCin != null) {
            Medecin logData = this.userService.findMedecinByCinAndPassword(bodyCin, bodyPassword);
            if (logData != null)

                return MedecinDto.from(logData);
            else
                throw new Exception(" User not found ");
        } else {
            throw new Exception(" Empty field !");
        }
    }

    // Get Collections

    @GetMapping(value = "/all")
    public List<User> getUsers() {
        return this.userService.getAllUser();
    }

    @GetMapping(path = "/patient/all")
    public ResponseEntity<List<PatientDto>> getAllPatient() {
        List<Patient> patients = this.userService.findAllPatients();
        List<PatientDto> patientDtos = patients.stream().map(PatientDto::from).collect(Collectors.toList());

        return new ResponseEntity<>(patientDtos, HttpStatus.OK);
    }

    @GetMapping(path = "/medecin/all")
    public List<MedecinDto> getAllMedecin() {
        List<Medecin> medecins = this.userService.findAllMedecins();
        return medecins.stream().map(MedecinDto::from).collect(Collectors.toList());
    }

    @GetMapping(path = "/medecin/findByNom/{nom}")
    public List<MedecinDto> findMedecinByNom(@PathVariable("nom") String nom) {
        List<Medecin> medecins = this.userService.findMedecinByNom(nom);
        return medecins.stream().map(MedecinDto::from).collect(Collectors.toList());
    }

    @GetMapping(path = "/medecin/findBySpecialite/{specialite}")
    public List<MedecinDto> findMedecinBySpecialite(@PathVariable("specialite") String specialite) {
        List<Medecin> medecins = this.userService.findMedecinBySpecialite(specialite);
        return medecins.stream().map(MedecinDto::from).collect(Collectors.toList());
    }

    // Get One value

    @GetMapping(path = "/patient/{username}")
    public ResponseEntity<PatientDto> getPatientByUsername(@PathVariable("username") String username) {
        Patient patient = this.userService.findPatientByUsername(username);

        return new ResponseEntity<>(PatientDto.from(patient), HttpStatus.OK);
    }

    @GetMapping(path = "/medecin/{cin}")
    public MedecinDto getMedecinByCin(@PathVariable("cin") String cin) {
        Medecin medecin = this.userService.findMedecinByCin(cin);
        return MedecinDto.from(medecin);
    }

    @GetMapping(path = "/medecin/check/{email}")
    public ResponseEntity<MedecinDto> findByMedecinEmail(@PathVariable final String email){
        Medecin medecin = this.userService.findByEmail(email);

        return new ResponseEntity<>(MedecinDto.from(medecin), HttpStatus.OK);
    }

    @GetMapping(path = "/patient/check/{email}")
    public ResponseEntity<PatientDto> findByPatientEmail(@PathVariable final String email){
        Patient patient = this.userService.findByPatientEmail(email);

        return new ResponseEntity<>(PatientDto.from(patient), HttpStatus.OK);
    }

    // Delete

    @DeleteMapping(path = "/patient/{username}")
    public ResponseEntity<PatientDto> DeletePatientByUsername(@PathVariable("username") String username) {
        Patient patient = this.userService.deletePatientByUsername(username);

        return new ResponseEntity<>(PatientDto.from(patient), HttpStatus.OK);
    }

    // Emails and Reset Password

    @PostMapping(path = "medecin/{email}/reset-password")
    public ResponseEntity<MedecinDto> medecinReset(@PathVariable final String email,
                                               @RequestBody final MailDto mailDto){
        Medecin medecin = this.userService.findByEmail(email);
        if (Objects.isNull(medecin)){
            return null;
        }else{
            this.mailService.medecinReset(mailDto);

            return new ResponseEntity<>(MedecinDto.from(medecin), HttpStatus.OK);
        }
    }

    @PostMapping(path = "patient/{email}/reset-password")
    public ResponseEntity<PatientDto> patientReset(@PathVariable final String email,
                                                   @RequestBody final MailDto mailDto){
        Patient patient = this.userService.findByPatientEmail(email);
        if (Objects.isNull(patient)){
            return null;
        }else{
            this.mailService.patientReset(mailDto);

            return new ResponseEntity<>(PatientDto.from(patient), HttpStatus.OK);
        }
    }

    @PostMapping(path = "patient/username/check")
    public ResponseEntity<PatientDto> patientCheck(@RequestBody final UsernameDto usernameDto){
        Patient patient = this.userService.findPatientByUsername(usernameDto.getUsername());

        if (Objects.nonNull(patient)){
            return new ResponseEntity<>(PatientDto.from(patient), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping(path = "medecin/cin/check")
    public ResponseEntity<MedecinDto> medecinCheck(@RequestBody final CinDto cinDto){
        Medecin medecin = this.userService.findMedecinByCin(cinDto.getCin());

        if (Objects.nonNull(medecin)){
            return new ResponseEntity<>(MedecinDto.from(medecin), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping(path = "patient/{username}/reset")
    public ResponseEntity<PatientDto> patientReset(@RequestBody final ResetPasswordDto resetPasswordDto,
                                                   @PathVariable final String username){
        Patient patient = this.userService.findPatientByUsername(username);

            if (Objects.nonNull(patient)){
                this.userService.resetPatientPassword(resetPasswordDto, username);

                return new ResponseEntity<>(PatientDto.from(patient), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
    }

    @PostMapping(path = "medecin/{cin}/reset")
    public ResponseEntity<MedecinDto> medecinReset(@RequestBody final ResetPasswordDto resetPasswordDto,
                                                   @PathVariable final String cin){
        Medecin medecin = this.userService.findMedecinByCin(cin);

        if (Objects.nonNull(medecin)){
            this.userService.resetPassword(resetPasswordDto, cin);
            return new ResponseEntity<>(MedecinDto.from(medecin), HttpStatus.OK);
        }else
        {
           return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

    }


    // Update

    @PutMapping(value = "/patient/update/{username}")
    public ResponseEntity<PatientDto> updatePatient(@RequestBody final PatientDto patient,
                                                    @PathVariable final String username) throws Exception {
        Patient newPatient = this.userService.updatePatient(Patient.from(patient), username);

        return new ResponseEntity<>(PatientDto.from(newPatient), HttpStatus.OK);
    }

    @PutMapping(value = "/medecin/update/{cin}")
    public ResponseEntity<MedecinDto> updateMedecin(
            @RequestBody final MedecinDto medecin,
            @PathVariable final String cin
    ) throws Exception {
        Medecin newMedecin = this.userService.updateMedecin(Medecin.from(medecin), cin);

        return new ResponseEntity<>(MedecinDto.from(newMedecin), HttpStatus.OK);
    }

    // Relationships

    @GetMapping(value = "/patient/{username}/rendezvous/{rdvId}/add")
    public ResponseEntity<PatientDto> addRdvOfPatient(@PathVariable final String username,
                                                      @PathVariable final Long rdvId) {

        Patient patient = this.userService.addRendezVous(username, rdvId);
        return new ResponseEntity<>(PatientDto.from(patient), HttpStatus.OK);

    }

    @GetMapping(value = "/patient/{username}/rendezvous")
    public ResponseEntity<PatientDto> getPatientWithRdv(@PathVariable final String username) {
        Patient patient = this.userService.findPatientWithRdv(username);

        if (patient != null) {
            return new ResponseEntity<>(PatientDto.from(patient), HttpStatus.OK);
        }

        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }

    @GetMapping(value = "/medecin/{cin}/rendezvous/{rdvId}/assign")
    public ResponseEntity<MedecinDto> assignRdvToMedecin(@PathVariable final String cin,
                                                         @PathVariable final Long rdvId) {
        Medecin medecin = this.userService.connectToRendezVous(cin, rdvId);

        return new ResponseEntity<>(MedecinDto.from(medecin), HttpStatus.OK);
    }

    @DeleteMapping(value = "/patient/{username}/rendezvous/{rdvId}/remove")
    public ResponseEntity<PatientDto> deleteRdvOfPatient(@PathVariable final String username,
                                                         @PathVariable final Long rdvId) {
        Patient patient = this.userService.deleteRendezVous(username, rdvId);
        return new ResponseEntity<>(PatientDto.from(patient), HttpStatus.OK);
    }

    @GetMapping(value = "/patient/{username}/dossier/{id}/attach")
    public ResponseEntity<PatientDto> attachPatientToDossier(@PathVariable final String username,
                                                             @PathVariable final Long id) {
        Patient patient = this.userService.addDossierMedical(username, id);

        return new ResponseEntity<>(PatientDto.from(patient), HttpStatus.OK);
    }

    @GetMapping(value = "/medecin/{cin}/dossier/{id}")
    public ResponseEntity<MedecinDto> connectToDossier(@PathVariable final String cin,
                                                       @PathVariable final Long id){
        Medecin medecin = this.userService.connectToDossier(cin, id);

        return new ResponseEntity<>(MedecinDto.from(medecin), HttpStatus.OK);
    }

    @DeleteMapping(value = "/patient/{username}/dossier/{id}/detach")
    public ResponseEntity<PatientDto> detachPatientToDossier(@PathVariable final String username,
                                                             @PathVariable final Long id) {
        Patient patient = this.userService.deleteDossierMedical(username, id);

        return new ResponseEntity<>(PatientDto.from(patient), HttpStatus.OK);
    }

    @GetMapping(value = "/agenda/{id}/medecin/{cin}")
    public ResponseEntity<MedecinDto> addAgenda(@PathVariable final Long id,
                                                @PathVariable final String cin) {
        Medecin medecin = this.userService.addAgenda(cin, id);

        return new ResponseEntity<>(MedecinDto.from(medecin), HttpStatus.OK);
    }

    @GetMapping(value = "/agenda/{id}/{cin}/delete")
    public ResponseEntity<MedecinDto> removeAgenda(@PathVariable final Long id,
                                                   @PathVariable final String cin){
        Medecin medecin =  this.userService.removeAgenda(cin, id);

        return new ResponseEntity<>(MedecinDto.from(medecin), HttpStatus.OK);
    }

    @GetMapping(value = "/patient/dossier/{id}")
    public ResponseEntity<PatientDto> deleteDossier(@PathVariable final Long id){
        Patient patient = this.userService.findByDossierId(id);
        if(Objects.nonNull(patient)){
            patient.setDossierMedical(null);
            this.dossierService.deleteDossierMedical(id);
            return new ResponseEntity<>(PatientDto.from(patient), HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @PostMapping(value = "/horraire/{cin}")
    public ResponseEntity<MedecinDto> addHorraire(@RequestBody final Horraire horraire,
                                                  @PathVariable final String cin) throws Exception {
        Medecin medecin = this.userService.findMedecinByCin(cin);
        Horraire horraire1 = this.horraireService.findByDay(horraire.getJour());

        if(Objects.nonNull(horraire1)){
            throw new Exception(" already exist ");
        }else{
            medecin.addHorraire(horraire);
            this.userService.SaveUser(medecin);

            return ResponseEntity.ok().body(MedecinDto.from(medecin));
        }
    }

}