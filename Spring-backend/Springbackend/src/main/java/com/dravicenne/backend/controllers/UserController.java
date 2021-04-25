package com.dravicenne.backend.controllers;

import com.dravicenne.backend.models.DossierMedical;
import com.dravicenne.backend.models.exception.NotFoundException;
import com.dravicenne.backend.models.login.LoginMedecin;
import com.dravicenne.backend.models.login.LoginPatient;
import com.dravicenne.backend.models.Medecin;
import com.dravicenne.backend.models.User;
import com.dravicenne.backend.models.Patient;
import com.dravicenne.backend.services.DossierService;
import com.dravicenne.backend.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.security.SecureRandom;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@ResponseBody
@RestController
@AllArgsConstructor
@RequestMapping(path = "user")
public class UserController {

    private final UserService userService;
    private final DossierService dossierService;
    private static final SecureRandom secureRandom = new SecureRandom(); //threadsafe
    private static final Base64.Encoder base64Encoder = Base64.getUrlEncoder(); //threadsafe

    private String getJWTToken() {
        byte[] randomBytes = new byte[100];
        secureRandom.nextBytes(randomBytes);
        return base64Encoder.encodeToString(randomBytes);
    }

    //Register Api's for Users
    @PostMapping(value = "/patient/register")
    public ResponseEntity<String> register(@RequestBody Patient patient) throws Exception {
        String bodyEmail = patient.getEmail();
        String bodyUsername = patient.getUsername();

        if (bodyEmail != null && !"".equals(bodyEmail)) {
            User userEmail = this.userService.findUserByEmail(bodyEmail);
            Patient patientUsername = this.userService.findPatientByUsername(bodyUsername);

            if (userEmail != null)
                return new ResponseEntity<String>("Email " + userEmail + " already taken", HttpStatus.CONFLICT);
            else if (patientUsername != null)
                return new ResponseEntity<String>(" Username " + bodyUsername + " already taken", HttpStatus.CONFLICT);
            else {
                this.userService.SaveUser(patient);
                return new ResponseEntity<String>("User registered successfully ", HttpStatus.OK);
            }

        } else {
            throw new Exception(" empty field ");
        }
    }

    @PostMapping(value = "/medecin/register")
    public ResponseEntity<String> register(@RequestBody Medecin medecin) throws Exception {
        String bodyEmail = medecin.getEmail();
        String bodyCin = medecin.getCin();

        if (bodyEmail != null && !"".equals(bodyEmail)) {
            User userEmail = this.userService.findUserByEmail(bodyEmail);
            Medecin medecinCin = this.userService.findMedecinByCin(bodyCin);

            if (userEmail != null)
                return new ResponseEntity<String>("Email " + userEmail + " already taken", HttpStatus.CONFLICT);
            else if (medecinCin != null)
                return new ResponseEntity<String>(" Cin " + bodyCin + " already taken", HttpStatus.CONFLICT);
            else {
                this.userService.SaveUser(medecin);
                return new ResponseEntity<String>("User registered successfully !/", HttpStatus.OK);
            }

        } else {
            throw new Exception(" empty field ");
        }
    }

    //Login Api's for Users
    @PostMapping(value = "/patient/login")
    public Patient PatientLogin(@RequestBody LoginPatient patient) throws Exception {
        String bodyUsername = patient.getUsername();
        String bodyPassword = patient.getPassword();
        String token;

        if (bodyPassword != null && bodyUsername != null) {
            Patient logData = this.userService.findPatientByUsername(bodyUsername);
            if (logData != null) {
                if (logData.getUsername().equals(bodyUsername) && logData.getPassword().equals(bodyPassword)) {
                    token = getJWTToken();
                    logData.setToken(token);
                    return logData;
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
    public Medecin MedecinLogin(@RequestBody LoginMedecin medecin) throws Exception {
        String bodyCin = medecin.getCin();
        String bodyPassword = medecin.getPassword();

        if (bodyPassword != null && bodyCin != null) {
            Medecin logData = this.userService.findMedecinByCinAndPassword(bodyCin, bodyPassword);
            if (logData != null)

                return logData;
            else
                throw new Exception(" User not found ");
        } else {
            throw new Exception(" Empty field !");
        }
    }

    //Get values from Users

    @GetMapping(value = "/all")
    public List<User> getUsers() {
        return this.userService.getAllUser();
    }

    @GetMapping(path = "/patient/{username}")
    public ResponseEntity<Patient> getPatientByUsername(@PathVariable("username") String username) {
        Patient patient = this.userService.findPatientByUsername(username);

        return new ResponseEntity<>(patient, HttpStatus.OK);
    }

    @DeleteMapping(path = "/patient/{username}")
    public ResponseEntity<Patient> DeletePatientByUsername(@PathVariable("username") String username) {
        Patient patient = this.userService.deletePatientByUsername(username);

        return new ResponseEntity<>(patient, HttpStatus.OK);
    }

    @GetMapping(path = "/medecin/{cin}")
    public Medecin getMedecinByCin(@PathVariable("cin") String cin) {
        return this.userService.findMedecinByCin(cin);
    }

    @GetMapping(path = "/patient/all")
    public ResponseEntity<List<Patient>> getAllPatient() {
        List<Patient> patient = this.userService.findAllPatients();

        return new ResponseEntity<>(patient, HttpStatus.OK);
    }

    @GetMapping(path = "/medecin/all")
    public List<Medecin> getAllMedecin() {
        return this.userService.findAllMedecins();
    }

    @GetMapping(path = "/medecin/findByNom/{nom}")
    public List<Medecin> findMedecinByNom(@PathVariable("nom") String nom) {
        return this.userService.findMedecinByNom(nom);
    }

    @GetMapping(path = "/medecin/findBySpecialite/{specialite}")
    public List<Medecin> findMedecinBySpecialite(@PathVariable("specialite") String specialite) {
        return this.userService.findMedecinBySpecialite(specialite);
    }


    // Update values 

    @PutMapping(value = "/patient/update/{username}")
    public ResponseEntity<Patient> updatePatient(@RequestBody final Patient patient,
                                                 @PathVariable final String username) throws Exception {
        Patient newPatient = this.userService.updatePatient(patient, username);

        return new ResponseEntity<Patient>(newPatient, HttpStatus.OK);
    }

    @PutMapping(value = "/medecin/update/{cin}")
    public ResponseEntity<Medecin> updateMedecin(
            @RequestBody final Medecin medecin,
            @PathVariable final String cin
    ) throws Exception {
        Medecin newMedecin = this.userService.updateMedecin(medecin, cin);

        return new ResponseEntity<>(newMedecin, HttpStatus.OK);
    }

    // Operations through relationships

    @GetMapping(value = "/patient/{username}/rendezvous/{rdvId}/add")
    public ResponseEntity<Patient> addRdvOfPatient(@PathVariable final String username,
                                                   @PathVariable final Long rdvId) {

        Patient patient = this.userService.addRendezVous(username, rdvId);
        return new ResponseEntity<>(patient, HttpStatus.OK);

    }

    @GetMapping(value = "/patient/{username}/rendezvous")
    public ResponseEntity<Patient> getPatientWithRdv(@PathVariable final String username) {
        Patient patient = this.userService.findPatientWithRdv(username);

        if (patient != null) {
            return new ResponseEntity<>(patient, HttpStatus.OK);
        }

        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }

    @GetMapping(value = "/medecin/{cin}/rendezvous/{rdvId}/assign")
    public ResponseEntity<Medecin> assignRdvToMedecin(@PathVariable final String cin,
                                                      @PathVariable final Long rdvId) {
        Medecin medecin = this.userService.connectToRendezVous(cin, rdvId);

        return new ResponseEntity<>(medecin, HttpStatus.OK);
    }

    @DeleteMapping(value = "/patient/{username}/rendezvous/{rdvId}/remove")
    public ResponseEntity<Patient> deleteRdvOfPatient(@PathVariable final String username,
                                                      @PathVariable final Long rdvId) {
        Patient patient = this.userService.deleteRendezVous(username, rdvId);
        return new ResponseEntity<>(patient, HttpStatus.OK);
    }

    @GetMapping(value = "/patient/{username}/dossier/{id}/attach")
    public ResponseEntity<Patient> attachPatientToDossier(@PathVariable final String username,
                                                          @PathVariable final Long id) {
        Patient patient = this.userService.addDossierMedical(username, id);

        return new ResponseEntity<>(patient, HttpStatus.OK);
    }

    @DeleteMapping(value = "/patient/{username}/dossier/{id}/detach")
    public ResponseEntity<Patient> detachPatientToDossier(@PathVariable final String username,
                                                          @PathVariable final Long id) {
        Patient patient = this.userService.deleteDossierMedical(username, id);

        return new ResponseEntity<>(patient, HttpStatus.OK);
    }

}