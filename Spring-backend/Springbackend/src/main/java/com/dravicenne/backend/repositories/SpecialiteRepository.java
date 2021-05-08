package com.dravicenne.backend.repositories;

import com.dravicenne.backend.models.Specialites;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpecialiteRepository extends JpaRepository<Specialites, Long> {
    @Query("Select spec from Specialites spec where spec.medecinList.get(cin)=?1")
    public List<Specialites> findWithMedecin(String cin);
}
