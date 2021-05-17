package com.dravicenne.backend.repositories;

import com.dravicenne.backend.models.Code;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CodeRepository extends JpaRepository<Code, Long> {
    Code findCodeByCin(String cin);
}
