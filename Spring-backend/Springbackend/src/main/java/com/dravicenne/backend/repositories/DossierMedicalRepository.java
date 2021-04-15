package com.dravicenne.backend.repositories;

import com.dravicenne.backend.models.DossierMedical;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DossierMedicalRepository extends JpaRepository<DossierMedical, Long> {
    Boolean findByPatientUsername(String username);
}
