package com.dravicenne.backend.repositories;

import com.dravicenne.backend.models.dto.PaiementDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PaiementRepository extends JpaRepository<PaiementDto, Long> {
    PaiementDto findByNumero(Long numero);
    List<PaiementDto> findByPatientUsername(String username);

    @Query("select p from paiement p where p.patient.username=?1")
    List<PaiementDto> findPaiementByDate(String username);

    @Modifying
    @Query("delete from paiement p where p.patient.username=?1")
    void deleteHistorique(String username);

}
