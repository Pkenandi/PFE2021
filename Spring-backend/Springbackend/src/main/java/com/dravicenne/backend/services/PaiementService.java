package com.dravicenne.backend.services;

import com.dravicenne.backend.models.dto.PaiementDto;
import com.dravicenne.backend.models.exception.NotFoundException;
import com.dravicenne.backend.repositories.PaiementRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
@Data
public class PaiementService {
    private final PaiementRepository paiementRepository;

    public PaiementDto payer(PaiementDto paiementDto){
        return this.paiementRepository.save(paiementDto);
    }

    public PaiementDto annuler(Long numero){
        PaiementDto paiementDto = this.paiementRepository.findByNumero(numero);
        this.paiementRepository.delete(paiementDto);
        return paiementDto;
    }

    public List<PaiementDto> historique (String username){
        return this.paiementRepository.findByPatientUsername(username);
    }

    public List<PaiementDto> findByDate(String username){
        return this.paiementRepository.findPaiementByDate(username);
    }

    public void deleteHistorique(String username){
        List<PaiementDto> paiementDto = this.historique(username);
        if(paiementDto.isEmpty()){
            throw new NotFoundException(" Vous n'avez pas d'historique de paiement ");
        }else{
            this.paiementRepository.deleteHistorique(username);
        }
    }
}
