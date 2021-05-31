package com.dravicenne.backend.controllers;

import com.dravicenne.backend.models.Horraire;
import com.dravicenne.backend.services.HorraireService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "horraire")
public class HorraireController {
    private final HorraireService horraireService;

    @PostMapping
    public ResponseEntity<Horraire> save(@RequestBody final Horraire horraire){
        Horraire horraire1 = this.horraireService.save(horraire);

        return ResponseEntity.ok().body(horraire1);
    }

    @GetMapping(value = "/medecin/{id}")
    public ResponseEntity<List<Horraire>> belongsToMedecin(@PathVariable final Long id){
        List<Horraire> horraireList = this.horraireService.belongsToMedecin(id);

        return ResponseEntity.ok().body(horraireList);
    }
}
