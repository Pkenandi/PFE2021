package com.dravicenne.backend.repositories;

import com.dravicenne.backend.models.Mail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MailRepository extends JpaRepository<Mail,Long> {
}