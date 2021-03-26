package com.dravicenne.backend.repositories;

import com.dravicenne.backend.models.Patient;
import com.dravicenne.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByEmail(String email);
}
