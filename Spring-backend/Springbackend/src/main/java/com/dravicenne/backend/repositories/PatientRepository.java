package com.dravicenne.backend.repositories;

import com.dravicenne.backend.models.Medecin;
import com.dravicenne.backend.models.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, String> {
    Patient findPatientByUsername(String username);
    Patient findPatientByUsernameAndPassword(String username, String password);
    Patient findByEmail(final String email);
    @Modifying
    @Query("update Patient pat set pat.password=?1, pat.Cpassword=?2 where pat.username=?3")
    void resetPassword(String password, String Cpassword, String username);
}
