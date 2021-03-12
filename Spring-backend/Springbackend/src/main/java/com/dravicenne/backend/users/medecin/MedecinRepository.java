package com.dravicenne.backend.users.medecin;

import com.dravicenne.backend.users.User;
import com.dravicenne.backend.users.UserRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MedecinRepository extends UserRepository {
    Optional<User> findMedecinByEmail(String email);
}
