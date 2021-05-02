package com.dravicenne.backend.repositories;

import com.dravicenne.backend.models.Specialites;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecialiteRepository extends JpaRepository<Specialites, Long> {
}
