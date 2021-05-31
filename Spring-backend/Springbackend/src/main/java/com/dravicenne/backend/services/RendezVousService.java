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

    public List<RendezVous> findByStatus(String state, String username){
        return this.rendezVousRepository.RdvAttente(state, username);
    }

    public List<RendezVous> findWithMedecin(String status, String cin){
        return this.rendezVousRepository.RdvMedecin(status, cin);
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
        rendezVousToEdit.setHeure(rendezVous.getHeure());

        return this.rendezVousRepository.save(rendezVousToEdit);

    }

    public void Cancel(String status, Long id){
        this.rendezVousRepository.Cancel(status, id);
    }

    public RendezVous findByPatient_UsernameAndMedecin_Cin(String cin, String username){
        return this.rendezVousRepository.findByPatient_UsernameAndMedecin_Cin(username, cin);
    }

}
