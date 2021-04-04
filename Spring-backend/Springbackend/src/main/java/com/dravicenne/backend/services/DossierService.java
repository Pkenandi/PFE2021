package com.dravicenne.backend.services;

import com.dravicenne.backend.models.DossierMedical;
import com.dravicenne.backend.repositories.DossierMedicalRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Data
public class DossierService {

    private final DossierMedicalRepository dossierMedicalRepository;

}
