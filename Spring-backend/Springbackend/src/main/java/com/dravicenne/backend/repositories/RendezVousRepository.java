package com.dravicenne.backend.repositories;

import com.dravicenne.backend.enumeration.State;
import com.dravicenne.backend.models.RendezVous;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface RendezVousRepository extends JpaRepository<RendezVous, Long> {
    List<RendezVous> findByStatus(String state);
    @Query("Select rdv from RendezVous rdv where rdv.status=?1 and rdv.patient.username=?2")
    List<RendezVous> RdvAttente(String status, String username);

    @Transactional
    @Modifying
    @Query("update RendezVous r set r.status=?1 where r.patient.username = ?2 and r.id = ?3")
    void Cancel(String status, String username, Long id);
}
