package com.dravicenne.backend.controllers;

import com.dravicenne.backend.models.Medecin;
import com.dravicenne.backend.models.User;
import com.dravicenne.backend.models.Patient;
import com.dravicenne.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping(path = "user")
public class UserController {

    @Autowired
    UserService userService;

    //Register Api's for Users
    @PostMapping(value = "/patient/register")
    public void register(@RequestBody Patient patient) throws Exception {
        String bodyEmail = patient.getEmail();
        String bodyUsername = patient.getUsername();

        if(bodyEmail != null && !"".equals(bodyEmail))
        {
            User user = this.userService.findUserByEmail(bodyEmail);
            Patient patientUsername = this.userService.findPatientByUsername(bodyUsername);

            if (user != null)
                throw new Exception(" Email "+ bodyEmail +" Already taken");
            if(patientUsername != null)
                throw new Exception(" Username "+ bodyUsername+" Already taken");

            this.userService.SaveUser(patient);

        }else
        {
            throw new Exception(" empty field ");
        }

    }

    @PostMapping(value = "/medecin/register")
    public void register(@RequestBody Medecin medecin) throws Exception {
        String bodyEmail = medecin.getEmail();
        String bodyCin = medecin.getCin();
        String password = medecin.getPassword();
        String cpassword = medecin.getCpassword();

        if(bodyEmail != null && !"".equals(bodyEmail))
        {
            User user = this.userService.findUserByEmail(bodyEmail);
            Medecin medecinCin = this.userService.findMedecinByCin(bodyCin);

            if (user != null)
                throw new Exception(" Email "+ bodyEmail +" Already taken");
            if(medecinCin != null)
                throw new Exception(" Username "+ bodyCin +" Already taken");
            if (!password.equals(cpassword))
            {
                throw new Exception(" Password and Cpassword doesn't match");
            }

            this.userService.SaveUser(medecin);

        }else
        {
            throw new Exception(" empty field ");
        }
    }

    //Get values from Users
    @GetMapping(value = "/all")
    public List<User> getUsers()
    {
        return this.userService.getAllUser();
    }

    @GetMapping(path = "/patient/{username}")
    public Patient getPatientByUsername(@PathVariable("username") String username)
    {
        return this.userService.findPatientByUsername(username);
    }

    @GetMapping(path = "/medecin/{cin}")
    public Medecin getMedecinByCin(@PathVariable("cin") String cin)
    {
        return this.userService.findMedecinByCin(cin);
    }

    @GetMapping(path = "/patient/all")
    public List<Patient> getAllPatient()
    {
        return this.userService.findAllPatients();
    }

    @GetMapping(path = "/medecin/all")
    public List<Medecin> getAllMedecin()
    {
        return this.userService.findAllMedecins();
    }
    @GetMapping(path = "/medecin/findByNom/{nom}")
    public List<Medecin> findMedecinByNom(@PathVariable("nom") String nom)
    {
        return this.userService.findMedecinByNom(nom);
    }

    @GetMapping(path = "/medecin/findBySpecialite/{specialite}")
    public List<Medecin> findMedecinBySpecialite(@PathVariable("specialite") String specialite)
    {
        return this.userService.findMedecinBySpecialite(specialite);
    }

    //Login Api's for Users
    @PostMapping(value = "/patient/login")
    public Patient PatientLogin(@RequestBody Patient patient) throws Exception {
        String bodyUsername = patient.getUsername();
        String bodyPassword = patient.getPassword();

        if( bodyPassword != null && bodyUsername != null)
        {
            Patient logData = this.userService.findPatientByUsernameAndPassword(bodyUsername,bodyPassword);
            if (logData != null)
                return logData;
            else
                throw new Exception(" User not found ");
        }else
        {
            throw new Exception(" Empty field !");
        }
    }

    @PostMapping(value = "/medecin/login")
    public Medecin MedecinLogin(@RequestBody Medecin medecin) throws Exception {
        String bodyCin = medecin.getCin();
        String bodyPassword = medecin.getPassword();

        if( bodyPassword != null && bodyCin != null)
        {
            Medecin logData = this.userService.findMedecinByCinAndPassword(bodyCin,bodyPassword);
            if (logData != null)

                return logData;
            else
                throw new Exception(" User not found ");
        }else
        {
            throw new Exception(" Empty field !");
        }
    }
}
