package com.dravicenne.backend.services;

import com.dravicenne.backend.models.Horraire;
import com.dravicenne.backend.repositories.HorraireRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class HorraireService {
    private final HorraireRepository horraireRepository;

    public Horraire save(Horraire horraire){
        return this.horraireRepository.save(horraire);
    }

    public List<Horraire> belongsToMedecin(Long id){
        return this.horraireRepository.belongsToMedecin(id);
    }
}
