package com.dravicenne.backend.controllers;

import com.dravicenne.backend.models.dto.PaiementDto;
import com.dravicenne.backend.services.PaiementService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@RestController
@ResponseBody
@RequestMapping(path ="api/paiement")
public class PaiementController {
    private final PaiementService paiementService;

    @PostMapping
    public ResponseEntity<PaiementDto> payer(@RequestBody final PaiementDto paiementDto){
        PaiementDto paiementDto1 = this.paiementService.payer(paiementDto);

        return new ResponseEntity<>(paiementDto1, HttpStatus.OK);
    }

    @GetMapping(value = "annuler/{numeroCarte}")
    public ResponseEntity<PaiementDto> annuler(@PathVariable final Long numeroCarte){
        PaiementDto paiementDto = this.paiementService.annuler(numeroCarte);

        return new ResponseEntity<>(paiementDto, HttpStatus.OK);
    }


    @GetMapping(value = "historique/{username}")
    public ResponseEntity<List<PaiementDto>> historique(@PathVariable final String username){
        List<PaiementDto> paiementDtoList = this.paiementService.historique(username);

        return new ResponseEntity<>(paiementDtoList, HttpStatus.OK);
    }

    @GetMapping(value = "effacerHistorique/{username}")
    public void effacer(@PathVariable final String username){
        this.paiementService.deleteHistorique(username);
    }
}
