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

    @GetMapping(value = "/get/{id}")
    public ResponseEntity<Horraire> findById(@PathVariable final Long id){
        Horraire horraire = this.horraireService.findById(id);

        return ResponseEntity.ok().body(horraire);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Horraire> delete(@PathVariable final Long id){
        Horraire horraire = this.horraireService.findById(id);
        this.horraireService.delete(horraire);
        return ResponseEntity.ok().body(horraire);
    }

    @PutMapping(value = "/edit/{id}")
    public ResponseEntity<Horraire> edit(@PathVariable final Long id,
                                         @RequestBody final Horraire horraire) throws Exception {
        Horraire horraire1 = this.horraireService.edit(id, horraire);

        return ResponseEntity.ok().body(horraire1);
    }

}
