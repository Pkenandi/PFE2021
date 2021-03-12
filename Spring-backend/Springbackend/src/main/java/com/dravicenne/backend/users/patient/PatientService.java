package com.dravicenne.backend.users.patient;

import com.dravicenne.backend.users.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {
    private final PatientRepository patientRepository;

    @Autowired
    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<User> getPetients()
    {
        return this.patientRepository.findAll();
    }

    public void registerPatient(User user)
    {
        Optional<User> patientByEmail = this.patientRepository.findPatientByEmail(user.getEmail());

        if(patientByEmail.isPresent())
        {
            throw new IllegalStateException(" Email already taken ! ");
        }else
        {
            this.patientRepository.save(user);
        }
    }
}
