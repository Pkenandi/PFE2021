package com.dravicenne.backend.services;

import com.dravicenne.backend.models.Horraire;
import com.dravicenne.backend.models.exception.NotFoundException;
import com.dravicenne.backend.repositories.HorraireRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class HorraireService {
    private final HorraireRepository horraireRepository;

    public Horraire save(Horraire horraire){
        return this.horraireRepository.save(horraire);
    }

    public Horraire findByDay(String jour){
        return this.horraireRepository.findHorraireByJour(jour);
    }

    public Horraire findById(Long id) {
        return this.horraireRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(" Horraire not found"));
    }

    public List<Horraire> belongsToMedecin(Long id){
        return this.horraireRepository.belongsToMedecin(id);
    }

    public void delete(Horraire horraire) {
        this.horraireRepository.delete(horraire);
    }

    public Horraire edit(Long id, Horraire horraire) throws Exception {
        Horraire horraire1 = this.findById(id);
        Horraire horraire2 = this.findByDay(horraire.getJour());

        if(Objects.nonNull(horraire2)){
            throw new Exception(" Already taken ");
        }else{
            horraire1.setHeure_debut(horraire.getHeure_debut());
            horraire1.setHeure_fin(horraire.getHeure_fin());
            horraire1.setJour(horraire.getJour());

            return this.horraireRepository.save(horraire1);
        }
    }
}