package com.dravicenne.backend.services;

import com.dravicenne.backend.models.DossierMedical;
import com.dravicenne.backend.models.Patient;
import com.dravicenne.backend.models.exception.NotFoundException;
import com.dravicenne.backend.repositories.DossierMedicalRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Data
public class DossierService {

    private final DossierMedicalRepository dossierMedicalRepository;

    public DossierMedical createDossier(DossierMedical dossierMedical){
        return this.dossierMedicalRepository.save(dossierMedical);
    }

    public List<DossierMedical> findAll(){

        return this.dossierMedicalRepository.findAll();
    }

    public DossierMedical findById(Long id){

        return this.dossierMedicalRepository.findById(id).orElseThrow(
                () -> new NotFoundException(" Dossier medical not found ")
        );
    }

    public DossierMedical editDossierMedical(DossierMedical dossierMedical, Long id){
        DossierMedical dossierToEdit = this.findById(id);

        dossierToEdit.setPrescription(dossierMedical.getPrescription());
        dossierToEdit.setObservation(dossierMedical.getObservation());
        dossierToEdit.setNumero(dossierMedical.getNumero());
        dossierToEdit.setAntecedent(dossierMedical.getAntecedent());

        return this.dossierMedicalRepository.save(dossierToEdit);
    }

    public DossierMedical deleteDossierMedical(Long id){
        DossierMedical dossierToEdit = this.findById(id);
        this.dossierMedicalRepository.delete(dossierToEdit);

        return dossierToEdit;
    }

    public void disablePatientId(Long id){
        DossierMedical medical = new DossierMedical();
        medical.setPatient(null);
    }

    public Boolean hasDossierMedical(String username){
        return this.dossierMedicalRepository.findByPatientUsername(username);
    }

    public DossierMedical findWithPatient(String username){
        return this.dossierMedicalRepository.findWithPatient(username);
    }

}