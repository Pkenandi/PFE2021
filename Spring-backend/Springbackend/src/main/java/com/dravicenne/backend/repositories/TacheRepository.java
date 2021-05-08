package com.dravicenne.backend.repositories;

import com.dravicenne.backend.models.Tache;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TacheRepository extends JpaRepository<Tache, Long> {
    @Query(" Select t from Tache t where t.agenda.id=?1")
    public List<Tache> findWithAgenda(Long id);
}
