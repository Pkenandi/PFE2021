package com.dravicenne.backend.services;

import com.dravicenne.backend.models.Agenda;
import com.dravicenne.backend.models.Tache;
import com.dravicenne.backend.models.exception.NotFoundException;
import com.dravicenne.backend.models.exception.RdvAlreadyTaken;
import com.dravicenne.backend.repositories.AgendaRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
@Data
@Transactional
public class AgendaService {
    private final AgendaRepository agendaRepository;
    private final TacheService tacheService;

    public Agenda createAgenda(Agenda agenda) {
        return this.agendaRepository.save(agenda);
    }

    public List<Agenda> getAll() {
        return this.agendaRepository.findAll();
    }

    public Agenda findById(Long id) {
        return this.agendaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(" Agenda not found "));
    }

    public Agenda findWithMedecin(String cin){
        return this.agendaRepository.findWithMedecin(cin);
    }

    public Agenda editAgenda(Agenda agenda, Long id) {
        Agenda agendaToEdit = this.findById(id);
        agendaToEdit.setTitre(agenda.getTitre());

        return this.agendaRepository.save(agendaToEdit);
    }

    public void updateAgenda(String titre, String cin){
        this.agendaRepository.updateAgenda(titre, cin);
    }

    public Agenda deleteAgenda(Long id) {
        Agenda agendaToDelete = this.findById(id);
        if (agendaToDelete == null) {
            return null;
        } else {

            this.agendaRepository.delete(agendaToDelete);
            return agendaToDelete;
        }
    }

    public Agenda addTask(Long agenda_Id, Long tache_Id) {
        Agenda agenda = this.findById(agenda_Id);
        Tache tache = this.tacheService.getById(tache_Id);

        agenda.createTask(tache);
        tache.setAgenda(agenda);

        return agenda;

    }

    public Agenda removeTask(Long agenda_id, Long tache_id) {
        Agenda agenda = this.findById(agenda_id);
        Tache tache = this.tacheService.getById(tache_id);

        if (!(Objects.nonNull(tache.getAgenda()))) {
            agenda.removeTask(tache);
            tache.setAgenda(null);
            return agenda;
        } else {
            throw new NotFoundException(" Task Not found ");
        }
    }
}
