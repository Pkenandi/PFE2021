package com.dravicenne.backend.repositories;

import com.dravicenne.backend.models.Agenda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AgendaRepository extends JpaRepository<Agenda, Long> {
    @Query("Select a from Agenda a where a.medecin.cin=?1 ")
    public Agenda findWithMedecin(String cin);
}
