package com.dravicenne.backend.controllers;

import com.dravicenne.backend.models.DossierMedical;
import com.dravicenne.backend.services.DossierService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( path = "dossier")
@AllArgsConstructor
@ResponseBody
public class DossierController {

    private final DossierService dossierService;

    @GetMapping
    public ResponseEntity<List<DossierMedical>> findAll(){
        List<DossierMedical> dossierMedicals = this.dossierService.findAll();

        return new ResponseEntity<>(dossierMedicals, HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public DossierMedical createDossier(@RequestBody DossierMedical dossierMedical){
        return this.dossierService.createDossier(dossierMedical);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<DossierMedical> findById(@PathVariable final Long id){
        DossierMedical dossierMedical = this.dossierService.findById(id);

        return new ResponseEntity<>(dossierMedical, HttpStatus.OK);
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<DossierMedical> editDossierMedical(@RequestBody final DossierMedical dossierMedical,
                                                             @PathVariable final Long id){
        DossierMedical dossierToEdit = this.dossierService.editDossierMedical(dossierMedical, id);

        return new ResponseEntity<>(dossierToEdit, HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<DossierMedical> deleteDossierMedical(@PathVariable final Long id){
        DossierMedical dossierToDelete = this.dossierService.deleteDossierMedical(id);

        return new ResponseEntity<>(dossierToDelete, HttpStatus.OK);
    }

    @GetMapping(value = "/patient/{username}")
    public ResponseEntity<DossierMedical> findWithPatient(@PathVariable final String username){
        DossierMedical dossierMedical = this.dossierService.findWithPatient(username);

        if(dossierMedical == null){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(dossierMedical, HttpStatus.OK);
        }
    }
}