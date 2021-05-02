package com.dravicenne.backend.repositories;

import com.dravicenne.backend.models.DossierMedical;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DossierMedicalRepository extends JpaRepository<DossierMedical, Long> {
    Boolean findByPatientUsername(String username);

    @Query("Select d from DossierMedical d where d.patient.username = ?1")
    DossierMedical findWithPatient(String username);

    @Query("Select d from DossierMedical d where d.medecin.cin=?1")
    List<DossierMedical> findWithMedecinAndPatient(String cin);
}
