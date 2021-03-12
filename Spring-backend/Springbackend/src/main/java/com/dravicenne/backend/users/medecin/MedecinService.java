package com.dravicenne.backend.users.medecin;

import com.dravicenne.backend.users.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedecinService {
    public final MedecinRepository medecinRepository;

    @Autowired
    public MedecinService(MedecinRepository medecinRepository) {
        this.medecinRepository = medecinRepository;
    }

    public List<User> getMedecin()
    {
        return this.medecinRepository.findAll();
    }

    public void RegisterMedecin(User user)
    {
        Optional<User> medecinByEmail = medecinRepository.findMedecinByEmail(user.getEmail());

        if(medecinByEmail.isPresent()){
            throw new IllegalStateException(" Email already taken ");
        }else
        {
            this.medecinRepository.save(user);
        }
    }

}
