package com.dravicenne.backend.repositories;

import com.dravicenne.backend.models.Agenda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AgendaRepository extends JpaRepository<Agenda, Long> {
    Agenda findAgendaByTitre(String titre);
    @Query("Select a from Agenda a where a.medecin.cin=?1 ")
    Agenda findWithMedecin(String cin);

    @Modifying
    @Query("update Agenda a set a.titre=?1 where a.medecin.cin=?2")
    void updateAgenda(String titre, String cin);
}
