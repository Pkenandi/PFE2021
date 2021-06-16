package com.dravicenne.backend.controllers;

import com.dravicenne.backend.models.Agenda;
import com.dravicenne.backend.models.dto.AgendaDto;
import com.dravicenne.backend.services.AgendaService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@ResponseBody
@RequestMapping(path = "agenda")
public class AgendaController {
    private final AgendaService agendaService;

    @GetMapping
    public ResponseEntity<List<AgendaDto>> getAll(){
        List<Agenda> agendaCollection = this.agendaService.getAll();
        List<AgendaDto> agendaDtos = agendaCollection.stream().map(AgendaDto::from).collect(Collectors.toList());

        return new ResponseEntity<>(agendaDtos, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AgendaDto> createAgenda(@RequestBody final AgendaDto agenda){
        Agenda agendaCreated = this.agendaService.createAgenda(Agenda.from(agenda));
        return new ResponseEntity<>(AgendaDto.from(agendaCreated), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<AgendaDto> getOne(@PathVariable Long id){
        Agenda agenda = this.agendaService.findById(id);

        return new ResponseEntity<>(AgendaDto.from(agenda), HttpStatus.OK);
    }

    @GetMapping(value = "/medecin/{cin}")
    public ResponseEntity<AgendaDto> findWithMedecin(@PathVariable final String cin){
        Agenda agenda = this.agendaService.findWithMedecin(cin);
        if(Objects.isNull(agenda)){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(AgendaDto.from(agenda), HttpStatus.OK);
        }
    }

    @GetMapping(value = "/update/{titre}/{cin}")
    public ResponseEntity<String> updateAgenda(@PathVariable final String titre,
                                               @PathVariable final String cin){
        this.agendaService.updateAgenda(titre, cin);
        return ResponseEntity.ok().body(" Agenda mis Updated ");
    }

    @PutMapping(value = "/edit/{id}")
    public ResponseEntity<AgendaDto> Edit(@RequestBody final AgendaDto agenda, @PathVariable final Long id){
        Agenda agendaToEdit = this.agendaService.editAgenda(Objects.requireNonNull(Agenda.from(agenda)),id);

        return new ResponseEntity<>(AgendaDto.from(agendaToEdit), HttpStatus.OK);

    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<AgendaDto> delete(@PathVariable Long id){
        Agenda agendaToDelete = this.agendaService.deleteAgenda(id);

        return new ResponseEntity<>(AgendaDto.from(agendaToDelete), HttpStatus.OK);
    }

    @GetMapping(value = "add/{agenda_id}/{tache_id}")
    public ResponseEntity<AgendaDto> createTask(@PathVariable Long agenda_id,@PathVariable Long tache_id){
        Agenda agenda = this.agendaService.addTask(agenda_id,tache_id);

        return new ResponseEntity<>(AgendaDto.from(agenda), HttpStatus.OK);
    }

    @DeleteMapping(value = "delete/{agenda_id}/{tache_id}")
    public ResponseEntity<AgendaDto> deleteTask(@PathVariable Long agenda_id,@PathVariable Long tache_id) {
        Agenda agenda = this.agendaService.removeTask(agenda_id, tache_id);

        return new ResponseEntity<>(AgendaDto.from(agenda), HttpStatus.OK);
    }
}