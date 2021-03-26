package com.dravicenne.backend.repositories;

import com.dravicenne.backend.models.Medecin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedecinRepository extends JpaRepository<Medecin, String> {
    Medecin findMedecinBycin(String cin);
    Medecin findMedecinByCinAndPassword(String cin, String password);
    List<Medecin> findMedecinByNom(String nom);
    List<Medecin> findMedecinBySpecialite(String specialite);
}
