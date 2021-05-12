package com.dravicenne.backend.controllers;

import com.dravicenne.backend.models.RendezVous;
import com.dravicenne.backend.models.dto.RendezVousDto;
import com.dravicenne.backend.services.RendezVousService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@AllArgsConstructor
@ResponseBody
@RestController
@RequestMapping(path = "/rendezVous")
public class RendezVousController {
    private final RendezVousService rendezVousService;

    @PostMapping
    public ResponseEntity<RendezVousDto> addRendezVous(@RequestBody final RendezVousDto rendezVous){
        RendezVous rendezVous1 = this.rendezVousService.addRendezVous(RendezVous.from(rendezVous));

        return new ResponseEntity<>(RendezVousDto.from(rendezVous1), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<RendezVousDto>> getAll() {
        List<RendezVous> rendezVousList = this.rendezVousService.findAll();
        List<RendezVousDto> rendezVousDtos = rendezVousList.stream().map(RendezVousDto::from)
                .collect(Collectors.toList());
        return new ResponseEntity<>(rendezVousDtos, HttpStatus.OK);
    }

    @GetMapping(value = "/getByStatus/{status}/patient/{username}")
    public ResponseEntity<List<RendezVousDto>> findByStatus(
            @PathVariable final String status,
            @PathVariable final String username){
        List<RendezVous> rendezVous = this.rendezVousService.findByStatus(status, username);
        List<RendezVousDto> rendezVousDtos = rendezVous.stream().map(RendezVousDto::from)
                .collect(Collectors.toList());

        return new ResponseEntity<>(rendezVousDtos, HttpStatus.OK);
    }

    @GetMapping(value = "/getWithMedecin/{status}/medecin/{cin}")
    public ResponseEntity<List<RendezVousDto>> findWithMedecin(@PathVariable final String status,
                                                            @PathVariable final String cin){
        List<RendezVous> rendezVous = this.rendezVousService.findWithMedecin(status, cin);
        List<RendezVousDto> rendezVousDtos = rendezVous.stream().map(RendezVousDto::from)
                .collect(Collectors.toList());

        return new ResponseEntity<>(rendezVousDtos, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<RendezVousDto> findById(@PathVariable final Long id){
        RendezVous rendezVous = this.rendezVousService.findById(id);

        return new ResponseEntity<>(RendezVousDto.from(rendezVous), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<RendezVousDto> deleteRendezVous(@PathVariable final Long id){
        RendezVous rendezVous = this.rendezVousService.deleteRendezVous(id);

        return new ResponseEntity<>(RendezVousDto.from(rendezVous), HttpStatus.OK);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<RendezVousDto> editRendezVous(@PathVariable final Long id,
                                                        @RequestBody RendezVousDto rendezVousDto){
        RendezVous rendezVousToEdit = this.rendezVousService.editRendezVous(id, RendezVous.from(rendezVousDto));

        return new ResponseEntity<>(RendezVousDto.from(rendezVousToEdit), HttpStatus.OK);
    }

    @GetMapping(value = "/cancel/{id}/{status}")
    public ResponseEntity<RendezVousDto> Cancel(@PathVariable final Long id,
                                             @PathVariable final String status){
        RendezVous rendezVous = this.rendezVousService.findById(id);
        if(rendezVous == null){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        this.rendezVousService.Cancel(status, id);
        return new ResponseEntity<>(RendezVousDto.from(rendezVous), HttpStatus.OK);
    }

    @GetMapping(value = "/{cin}/{username}")
    public ResponseEntity<Boolean> findWithMedecinAndPatient(@PathVariable final String cin,
                                                             @PathVariable final String username){

        RendezVous exist = this.rendezVousService.findWithMedecinAndPatient(cin, username);

        if(Objects.nonNull(exist)){
            return new ResponseEntity<>(true, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }
}