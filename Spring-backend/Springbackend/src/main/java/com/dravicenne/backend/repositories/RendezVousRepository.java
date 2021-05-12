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
@Transactional
public interface RendezVousRepository extends JpaRepository<RendezVous, Long> {
    List<RendezVous> findByStatus(String state);

    @Query("Select rdv from RendezVous rdv where rdv.status=?1 and rdv.patient.username=?2")
    List<RendezVous> RdvAttente(String status, String username);

    @Query("Select rdv from RendezVous rdv where rdv.status=?1 and rdv.medecin.cin=?2")
    List<RendezVous> RdvMedecin(String status, String cin);

    @Query("Select rdv from RendezVous rdv where rdv.status=?1 and rdv.medecin.cin=?2")
    List<RendezVous> rdvWithMedecin(String status, String cin);

    @Modifying
    @Query(value = "UPDATE rendez_vous SET status = :status WHERE id = :id", nativeQuery = true)
    void Cancel(@Param(value = "status") String status, @Param(value = "id") Long id);

    @Query(" select rdv from RendezVous rdv where rdv.medecin.cin=?1 and rdv.patient.username=?1")
    RendezVous findWithMedecinAndPatient(String cin, String username);
}
