package com.dravicenne.backend.users.patient;

import com.dravicenne.backend.users.User;
import com.dravicenne.backend.users.UserRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepository extends UserRepository {
    Optional<User> findPatientByEmail(String email);
}
