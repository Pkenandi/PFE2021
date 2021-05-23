package com.dravicenne.backend.controllers;

import com.dravicenne.backend.models.DossierMedical;
import com.dravicenne.backend.models.dto.DossierDto;
import com.dravicenne.backend.services.DossierService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping( path = "dossier")
@AllArgsConstructor
@ResponseBody
public class DossierController {

    private final DossierService dossierService;

    @GetMapping
    public ResponseEntity<List<DossierDto>> findAll(){
        List<DossierMedical> dossierMedicals = this.dossierService.findAll();
        List<DossierDto> dossierDtos = dossierMedicals.stream().map(DossierDto::from).collect(Collectors.toList());

        return new ResponseEntity<>(dossierDtos, HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public DossierDto createDossier(@RequestBody DossierDto dossierMedical){
        DossierMedical dossierMedical1 = this.dossierService.createDossier(DossierMedical.from(dossierMedical));
        return DossierDto.from(dossierMedical1);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<DossierDto> findById(@PathVariable final Long id){
        DossierMedical dossierMedical = this.dossierService.findById(id);

        return new ResponseEntity<>(DossierDto.from(dossierMedical), HttpStatus.OK);
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<DossierDto> editDossierMedical(@RequestBody final DossierDto dossierMedical,
                                                             @PathVariable final Long id){
        DossierMedical dossierToEdit = this.dossierService.editDossierMedical(DossierMedical.from(dossierMedical), id);

        return new ResponseEntity<>(DossierDto.from(dossierToEdit), HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<DossierDto> deleteDossierMedical(@PathVariable final Long id){
        DossierMedical dossierToDelete = this.dossierService.deleteDossierMedical(id);

        return new ResponseEntity<>(DossierDto.from(dossierToDelete), HttpStatus.OK);
    }

    @GetMapping(value = "/patient/{username}")
    public ResponseEntity<DossierDto> findWithPatient(@PathVariable final String username){
        DossierMedical dossierMedical = this.dossierService.findWithPatient(username);

        if(dossierMedical == null){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(DossierDto.from(dossierMedical), HttpStatus.OK);
        }
    }

    @GetMapping(value = "/medecin/{cin}")
    public ResponseEntity<List<DossierDto>> findWithMedecin(@PathVariable final String cin){
        List<DossierMedical> dossierMedicalList = this.dossierService.findWithMedecin(cin);

        if(dossierMedicalList.isEmpty()){
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }else{
            List<DossierDto> dossierDtoList = dossierMedicalList.stream().map(DossierDto::from).collect(Collectors.toList());
            return new ResponseEntity<>(dossierDtoList, HttpStatus.OK);
        }
    }
}