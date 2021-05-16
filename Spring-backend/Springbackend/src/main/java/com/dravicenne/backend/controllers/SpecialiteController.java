package com.dravicenne.backend.controllers;

import com.dravicenne.backend.models.Specialites;
import com.dravicenne.backend.models.dto.SpecialitesDto;
import com.dravicenne.backend.services.SpecialiteService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@ResponseBody
@RestController
@RequestMapping("/specialite")
public class SpecialiteController {
    private final SpecialiteService specialiteService;

    @PostMapping
    public ResponseEntity<SpecialitesDto> add(@RequestBody final SpecialitesDto specialitesDto) {
        Specialites specialites1 = this.specialiteService.save(Specialites.from(specialitesDto));

        return new ResponseEntity<>(SpecialitesDto.from(specialites1), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<SpecialitesDto>> get(){
        List<Specialites> specialites = this.specialiteService.findAll();
        List<SpecialitesDto> specialitesDtos = specialites.stream().map(SpecialitesDto::from).collect(Collectors.toList());

        return new ResponseEntity<>(specialitesDtos, HttpStatus.OK);
    }

    @GetMapping(value = "/medecin/{id}")
    public ResponseEntity<List<SpecialitesDto>> findWithMedecin(@PathVariable final Long id) {
        List<Specialites> specialites = this.specialiteService.findWithMedecin(id);
        List<SpecialitesDto> specialitesDtoList = specialites.stream().map(SpecialitesDto::from).collect(Collectors.toList());

        return new ResponseEntity<>(specialitesDtoList, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}/medecin/{cin}")
    public ResponseEntity<SpecialitesDto> addMedecin(@PathVariable final Long id,
                                                  @PathVariable final String cin) {
        Specialites specialites = this.specialiteService.addMedecinAndSpecialite(cin, id);

        return new ResponseEntity<>(SpecialitesDto.from(specialites), HttpStatus.OK);
    }
}