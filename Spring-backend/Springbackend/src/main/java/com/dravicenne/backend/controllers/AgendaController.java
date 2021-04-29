package com.dravicenne.backend.controllers;

import com.dravicenne.backend.models.Agenda;
import com.dravicenne.backend.services.AgendaService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@ResponseBody
@RequestMapping(path = "/agenda")
public class AgendaController {
    private final AgendaService agendaService;

    @GetMapping
    public ResponseEntity<List<Agenda>> getAll(){
        List<Agenda> agendaCollection = this.agendaService.getAll();
        return new ResponseEntity<>(agendaCollection, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Agenda> createAgenda(@RequestBody final Agenda agenda){
        Agenda agendaCreated = this.agendaService.createAgenda(agenda);
        return new ResponseEntity<>(agendaCreated, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Agenda> getOne(@PathVariable Long id){
        Agenda agenda = this.agendaService.findById(id);

        return new ResponseEntity<>(agenda, HttpStatus.OK);
    }

    @PutMapping(value = "/edit/{id}")
    public ResponseEntity<Agenda> Edit(Agenda agenda, @PathVariable Long id){
        Agenda agendaToEdit = this.agendaService.findById(id);
        if(agendaToEdit == null){
            return null;
        }else{
            agendaToEdit.setTitre(agenda.getTitre());
            agendaToEdit.setId(agenda.getId());

            return new ResponseEntity<>(agendaToEdit, HttpStatus.OK);
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Agenda> delete(Agenda agenda, @PathVariable Long id){
        Agenda agendaToEdit = this.agendaService.findById(id);
        if(agendaToEdit == null){
            return null;
        }else{
            this.agendaService.deleteAgenda(agenda, id);

            return new ResponseEntity<>(agendaToEdit, HttpStatus.OK);
        }
    }

    @GetMapping(value = "add/{agenda_id}/{tache_id}")
    public ResponseEntity<Agenda> createTask(@PathVariable Long agenda_id,@PathVariable Long tache_id){
        Agenda agenda = this.agendaService.addTask(agenda_id,tache_id);

        return new ResponseEntity<>(agenda, HttpStatus.OK);
    }

    @DeleteMapping(value = "delete/{agenda_id}/{tache_id}")
    public ResponseEntity<Agenda> deleteTask(@PathVariable Long agenda_id,@PathVariable Long tache_id) {
        Agenda agenda = this.agendaService.removeTask(agenda_id, tache_id);

        return new ResponseEntity<>(agenda, HttpStatus.OK);
    }
}