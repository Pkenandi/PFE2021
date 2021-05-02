package com.dravicenne.backend.controllers;

import com.dravicenne.backend.models.Medecin;
import com.dravicenne.backend.models.Specialites;
import com.dravicenne.backend.services.SpecialiteService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Data
@AllArgsConstructor
@ResponseBody
@RestController
@RequestMapping("/specialite")
public class SpecialiteController {
    private final SpecialiteService specialiteService;

    @PostMapping
    public ResponseEntity<Specialites> add(@RequestBody final Specialites specialites){
        Specialites specialites1 = this.specialiteService.save(specialites);

        return new ResponseEntity<>(specialites1, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Specialites>> get(){
        List<Specialites> specialites = this.specialiteService.findAll();

        return new ResponseEntity<>(specialites, HttpStatus.OK);
    }

//    @GetMapping(value = "/{id}/medecin/{cin}")
//    public ResponseEntity<Specialites> addMedecin(@PathVariable final Long id,
//                                                  @PathVariable final String cin){
//        Specialites specialites = this.specialiteService.addMedecinAndSpecialite(cin, id);
//
//        return new ResponseEntity<>(specialites, HttpStatus.OK);
//    }
}
