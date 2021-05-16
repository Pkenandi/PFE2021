package com.dravicenne.backend.services;

import com.dravicenne.backend.models.Medecin;
import com.dravicenne.backend.models.Specialites;
import com.dravicenne.backend.models.exception.NotFoundException;
import com.dravicenne.backend.repositories.SpecialiteRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@AllArgsConstructor
@Data
@Transactional
public class SpecialiteService {
    private final SpecialiteRepository specialiteRepository;
    private final UserService userService;

    public List<Specialites> findAll(){
        return this.specialiteRepository.findAll();
    }

    public Specialites findOne(Long id){
        return this.specialiteRepository.findById(id).orElseThrow(
                () -> new NotFoundException(" Specialite not found ")
        );
    }

    public Specialites save(Specialites specialites){
        return this.specialiteRepository.save(specialites);
    }

    public Specialites edit(Specialites specialites, Long id){
        Specialites specialites1 = this.findOne(id);

        if(specialites1 != null){
            specialites1.setSpecialite(specialites.getSpecialite());
            specialites1.setId(specialites.getId());
            specialites1.setDescription(specialites.getDescription());

            return specialites1;
        }

        return null;
    }

    public Specialites delete(Long id){
        Specialites specialites1 = this.findOne(id);

        if(specialites1 != null){
            this.specialiteRepository.delete(specialites1);
            return specialites1;
        }

        return null;
    }

    public Specialites addMedecinAndSpecialite(String cin, Long specialite_id){
        Medecin medecin = this.userService.findMedecinByCin(cin);
        Specialites specialites = this.specialiteRepository.getOne(specialite_id);

        if (medecin != null){
            specialites.addMedecin(medecin);
            medecin.addSpecialite(specialites);

            return specialites;
        }

        return null;
    }

    public Specialites removeMedecin(String cin, Long id){
        Medecin medecin = this.userService.findMedecinByCin(cin);
        Specialites specialites = this.specialiteRepository.getOne(id);

        if(medecin != null){
            specialites.removeMedecin(medecin);
            return specialites;
        }
        return null;
    }

    public List<Specialites> findWithMedecin(Long id){
        return this.specialiteRepository.findWithMedecin(id);
    }
}