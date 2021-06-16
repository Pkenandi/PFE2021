package com.dravicenne.backend.repositories;

import com.dravicenne.backend.models.dto.TryDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TryRepository extends JpaRepository<TryDto, Long> {
}
