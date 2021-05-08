package com.dravicenne.backend.services;

import com.dravicenne.backend.models.Tache;
import com.dravicenne.backend.models.exception.NotFoundException;
import com.dravicenne.backend.repositories.TacheRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@AllArgsConstructor
@Service
@Transactional
public class TacheService {
    private final TacheRepository tacheRepository;

    public Tache createTache(Tache tache){
        return this.tacheRepository.save(tache);
    }

    public List<Tache> getAll (){
        return this.tacheRepository.findAll();
    }

    public Tache getById(Long id){
        return this.tacheRepository.findById(id)
                .orElseThrow(
                        () -> new NotFoundException(" Task not found !")
                );
    }

    public List<Tache> findWithAgenda(Long id){
        return this.tacheRepository.findWithAgenda(id);
    }

    public Tache editTache(Tache tache, Long id)    {
        Tache tacheToEdit = this.getById(id);

        if( tacheToEdit == null){
            return null;
        }else{
            tacheToEdit.setTache(tache.getTache());
            tacheToEdit.setHeure(tache.getHeure());
            tacheToEdit.setDate(tache.getDate());
            tacheToEdit.setId(tache.getId());
            tacheToEdit.setDescription(tache.getDescription());
            return tacheToEdit;
        }
    }

    public Tache deleteTache(Long id){
        Tache tacheToEdit = this.getById(id);

        if( tacheToEdit == null){
            return null;
        }else{
            this.tacheRepository.delete(tacheToEdit);
            return tacheToEdit;
        }
    }
}
