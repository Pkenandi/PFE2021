package com.dravicenne.backend.controllers;

import com.dravicenne.backend.models.Tache;
import com.dravicenne.backend.models.dto.TacheDto;
import com.dravicenne.backend.services.TacheService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@ResponseBody
@RequestMapping(path = "tache")
public class TacheController {
    private final TacheService tacheService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TacheDto> create(@RequestBody final TacheDto tache){
       Tache tache1 = this.tacheService.createTache(Tache.from(tache));
       return new ResponseEntity<>(TacheDto.from(tache1), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<TacheDto>> getAll(){
        List<Tache> tacheList = this.tacheService.getAll();
        List<TacheDto> tacheDtos = tacheList.stream().map(TacheDto::from).collect(Collectors.toList());

        return new ResponseEntity<>(tacheDtos, HttpStatus.OK);
    }

    @GetMapping(value = "/agenda/{id}")
    public ResponseEntity<List<TacheDto>> findWithAgenda(@PathVariable final Long id){
        List<Tache> tacheList = this.tacheService.findWithAgenda(id);
        List<TacheDto> tacheDtoList = tacheList.stream().map(TacheDto::from).collect(Collectors.toList());

        return new ResponseEntity<>(tacheDtoList, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<TacheDto> getById(@PathVariable final Long id){
        Tache tache = this.tacheService.getById(id);

        return new ResponseEntity<>(TacheDto.from(tache), HttpStatus.OK);
    }

    @GetMapping(value = "/get/{date}/{heure}")
    public TacheDto findByDateAndHeure(@PathVariable final LocalDate date,
                                       @PathVariable final String heure) throws Exception {
        return TacheDto.from(this.tacheService.findByHeureAndDate(date, heure));
    }

    @PutMapping(value = "edit/{id}")
    public ResponseEntity<TacheDto> Edit(@PathVariable final Long id,
                                      @RequestBody TacheDto tache){
        return new ResponseEntity<>(TacheDto
                .from(this.tacheService
                        .editTache(Tache.from(tache), id)),
                HttpStatus.OK);
    }

    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity<TacheDto> delete(@PathVariable final Long id){
        Tache tacheToDelete = this.tacheService.deleteTache(id);

        return new ResponseEntity<>(TacheDto.from(tacheToDelete), HttpStatus.OK);
    }
}
