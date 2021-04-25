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
    public ResponseEntity<RendezVous> addRendezVous(@RequestBody final RendezVous rendezVous){
        RendezVous rendezVous1 = this.rendezVousService.addRendezVous(rendezVous);

        return new ResponseEntity<>(rendezVous1, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<RendezVous>> getAll() {
        List<RendezVous> rendezVousList = this.rendezVousService.findAll();

        return new ResponseEntity<>(rendezVousList, HttpStatus.OK);
    }

    @GetMapping(value = "/getByStatus/{status}/patient/{username}")
    public ResponseEntity<List<RendezVous>> findByStatus(
            @PathVariable final String status,
            @PathVariable final String username){
        List<RendezVous> rendezVous = this.rendezVousService.findByStatus(status, username);
        return new ResponseEntity<>(rendezVous, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<RendezVous> findById(@PathVariable final Long id){
        RendezVous rendezVous = this.rendezVousService.findById(id);

        return new ResponseEntity<>(rendezVous, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<RendezVous> deleteRendezVous(@PathVariable final Long id){
        RendezVous rendezVous = this.rendezVousService.deleteRendezVous(id);

        return new ResponseEntity<>(rendezVous, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RendezVous> editRendezVous(@PathVariable final Long id,
                                                        @RequestBody RendezVous rendezVous){
        RendezVous rendezVousToEdit = this.rendezVousService.editRendezVous(id, rendezVous);

        return new ResponseEntity<>(rendezVousToEdit, HttpStatus.OK);
    }

    @PutMapping("/cancel/{status}/{username}/{id}")
    public void Cancel(@PathVariable final String status,
                       @PathVariable final String username,
                       @PathVariable final Long id){
        this.rendezVousService.Cancel(status, username, id);
    }
}
