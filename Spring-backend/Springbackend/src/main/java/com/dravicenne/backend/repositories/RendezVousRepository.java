package com.dravicenne.backend.repositories;

import com.dravicenne.backend.enumeration.State;
import com.dravicenne.backend.models.RendezVous;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RendezVousRepository extends JpaRepository<RendezVous, Long> {
    List<RendezVous> findByStatus(String state);
}
