package com.dravicenne.backend.controllers;

import com.dravicenne.backend.enumeration.State;
import com.dravicenne.backend.models.RendezVous;
import com.dravicenne.backend.models.dto.RendezVousDto;
import com.dravicenne.backend.services.RendezVousService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@ResponseBody
@RestController
@RequestMapping(path = "/rendezVous")
public class RendezVousController {
    public final RendezVousService rendezVousService;

    @PostMapping
    public ResponseEntity<RendezVousDto> addRendezVous(@RequestBody final RendezVousDto rendezVousDto){
        RendezVous rendezVous = this.rendezVousService.addRendezVous(RendezVous.from(rendezVousDto));

        return new ResponseEntity<>(RendezVousDto.from(rendezVous), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<RendezVousDto>> getAll() {
        List<RendezVous> rendezVousList = this.rendezVousService.findAll();
        List<RendezVousDto> rendezVousDtoList = rendezVousList
                .stream()
                .map(RendezVousDto::from)
                .collect(Collectors.toList());

        return new ResponseEntity<>(rendezVousDtoList, HttpStatus.OK);
    }

    @GetMapping(value = "/getByStatus/{status}")
    public ResponseEntity<List<RendezVous>> findByStatus(@PathVariable final String status){
        List<RendezVous> rendezVous = this.rendezVousService.findByStatus(status);
        return new ResponseEntity<>(rendezVous, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<RendezVousDto> findById(@PathVariable final Long id){
        RendezVous rendezVous = this.rendezVousService.findById(id);

        return new ResponseEntity<>(RendezVousDto.from(rendezVous), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<RendezVousDto> deleteRendezVous(@PathVariable final Long id){
        RendezVous rendezVous = this.rendezVousService.deleteRendezVous(id);

        return new ResponseEntity<>(RendezVousDto.from(rendezVous), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RendezVousDto> editRendezVous(@PathVariable final Long id,
                                                        @RequestBody RendezVousDto rendezVousDto){
        RendezVous rendezVousToEdit = this.rendezVousService.editRendezVous(id, RendezVous.from(rendezVousDto));

        return new ResponseEntity<>(RendezVousDto.from(rendezVousToEdit), HttpStatus.OK);
    }
}
