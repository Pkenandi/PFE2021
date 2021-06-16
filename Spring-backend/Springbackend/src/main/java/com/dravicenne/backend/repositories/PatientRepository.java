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
    @Query("select p from Patient p where p.dossierMedical.id=?1")
    Patient findByDossierMedicalId(final Long id);
    @Modifying
    @Query("update Patient pat set pat.password=?1, pat.Cpassword=?2 where pat.username=?3")
    void resetPassword(String password, String Cpassword, String username);
    @Modifying
    @Query("update Patient p set p.picture=?1 where p.username=?2")
    void setProfilePicture(String picture, String username);

    @Modifying
    @Query("update Patient m set m.picture='NULL' where m.username=?1")
    void removeProfilePicture(String username);
}
