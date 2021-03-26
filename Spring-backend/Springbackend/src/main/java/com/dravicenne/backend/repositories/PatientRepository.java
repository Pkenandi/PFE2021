package com.dravicenne.backend.repositories;

import com.dravicenne.backend.models.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, String> {
    Patient findPatientByUsername(String username);
    Patient findPatientByUsernameAndPassword(String username, String password);
}
