package com.dravicenne.backend.repositories;

import com.dravicenne.backend.models.Medecin;
import com.dravicenne.backend.models.Specialites;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpecialiteRepository extends JpaRepository<Specialites, Long> {
    @Query(value = "select * from specialites spec " +
            "inner join medecin_specialite ms " +
            "on spec.id = ms.specialite_id " +
            "where ms.medecin_id =?1",
            nativeQuery = true)
    List<Specialites> findWithMedecin(Long id);
}
