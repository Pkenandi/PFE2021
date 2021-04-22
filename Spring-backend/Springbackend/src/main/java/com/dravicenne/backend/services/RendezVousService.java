package com.dravicenne.backend.services;

import com.dravicenne.backend.enumeration.State;
import com.dravicenne.backend.models.Patient;
import com.dravicenne.backend.models.RendezVous;
import com.dravicenne.backend.models.exception.NotFoundException;
import com.dravicenne.backend.repositories.RendezVousRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class RendezVousService {
    private final RendezVousRepository rendezVousRepository;

    public RendezVous addRendezVous( RendezVous rendezVous){
        return this.rendezVousRepository.save(rendezVous);
    }

    public List<RendezVous> findAll() {
        return this.rendezVousRepository.findAll();
    }

    public RendezVous findById(Long id) throws NotFoundException {
        return this.rendezVousRepository.findById(id)
                .orElseThrow(() ->
                        new NotFoundException(" Rendez-vous with id " + id +" not found")
                );
    }

    public List<RendezVous> findByStatus(String state){
        return this.rendezVousRepository.findByStatus(state);
    }

    public RendezVous deleteRendezVous(Long id){
        RendezVous rendezVous = this.findById(id);
        this.rendezVousRepository.delete(rendezVous);

        return rendezVous;
    }

    public RendezVous editRendezVous(Long id, RendezVous rendezVous){
        RendezVous rendezVousToEdit = this.findById(id);

        rendezVousToEdit.setStatus(rendezVous.getStatus());
        rendezVousToEdit.setDate(rendezVous.getDate());
        rendezVousToEdit.setNumero(rendezVous.getNumero());
        rendezVousToEdit.setHeure(rendezVous.getHeure());

        return this.rendezVousRepository.save(rendezVousToEdit);

    }

    public RendezVous alterRendezVous(Long id, RendezVous rendezVous){
        RendezVous rendezVousToEdit = this.findById(id);

        rendezVousToEdit.setStatus(rendezVous.getStatus());
        rendezVousToEdit.setDate(rendezVous.getDate());
        rendezVousToEdit.setNumero(rendezVous.getNumero());
        rendezVousToEdit.setHeure(rendezVous.getHeure());

        return this.rendezVousRepository.save(rendezVousToEdit);
    }

    // Get value attached with patient

}