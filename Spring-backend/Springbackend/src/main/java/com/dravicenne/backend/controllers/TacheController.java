package com.dravicenne.backend.controllers;

import com.dravicenne.backend.models.Tache;
import com.dravicenne.backend.services.TacheService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/tache")
public class TacheController {
    private final TacheService tacheService;

    @PostMapping
    public ResponseEntity<Tache> create(final Tache tache){
        Tache created = this.tacheService.createTache(tache);

        return new ResponseEntity<>(created, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Tache>> getAll(){
        List<Tache> tacheList = this.tacheService.getAll();

        return new ResponseEntity<>(tacheList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tache> getById(@PathVariable final Long id){
        Tache tache = this.tacheService.getById(id);

        return new ResponseEntity<>(tache, HttpStatus.OK);
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<Tache> Edit(Tache tache,@PathVariable final Long id){
        Tache tacheToEdit = this.tacheService.editTache(tache, id);

        return new ResponseEntity<>(tacheToEdit, HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Tache> delete(Tache tache,@PathVariable final Long id){
        Tache tacheToDelete = this.tacheService.deleteTache(tache, id);

        return new ResponseEntity<>(tacheToDelete, HttpStatus.OK);
    }
}
