package com.dravicenne.backend.controllers;

import com.dravicenne.backend.models.dto.TryDto;
import com.dravicenne.backend.repositories.TryRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@AllArgsConstructor
@RestController
@Transactional
@RequestMapping("try")
public class TryController {
    private final TryRepository tryRepository;

    @PostMapping
    public TryDto save(@RequestBody final TryDto tryDto){
        return this.tryRepository.save(tryDto);
    }

    @GetMapping
    public List<TryDto> list(){
        return this.tryRepository.findAll();
    }
}