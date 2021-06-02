package com.dravicenne.backend.repositories;

import com.dravicenne.backend.models.Horraire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HorraireRepository extends JpaRepository<Horraire, Long> {
    @Query(value = "select * from horraire h where h.medecin_id=?1", nativeQuery = true)
    List<Horraire> belongsToMedecin(Long id);
    Horraire findHorraireByJour(String jour);
}
