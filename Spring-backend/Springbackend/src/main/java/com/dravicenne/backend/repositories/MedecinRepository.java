package com.dravicenne.backend.repositories;

import com.dravicenne.backend.models.Medecin;
import com.dravicenne.backend.models.dto.ResetPasswordDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedecinRepository extends JpaRepository<Medecin, String> {
    Medecin findMedecinBycin(String cin);
    Medecin findMedecinByCinAndPassword(String cin, String password);
    Medecin findByEmail(String email);
    @Modifying
    @Query("update Medecin med set med.password=?1, med.Cpassword=?2 where med.cin=?3")
    void resetPassword(String password, String Cpassword, String cin);
    @Modifying
    @Query("update Medecin m set m.picture=?1 where m.cin=?2")
    void setProfilePicture(String picture, String cin);
    List<Medecin> findMedecinByNom(String nom);
    List<Medecin> findMedecinBySpecialite(String specialite);
}
