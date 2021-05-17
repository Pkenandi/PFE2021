package com.dravicenne.backend.services;

import com.dravicenne.backend.models.Code;
import com.dravicenne.backend.models.exception.NotFoundException;
import com.dravicenne.backend.repositories.CodeRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Data
public class CodeService {
    private final CodeRepository codeRepository;

    public Code add(Code code){
        return this.codeRepository.save(code);
    }

    public List<Code> findAll(){
        return this.codeRepository.findAll();
    }

    public Code findOne(Long id){
        return this.codeRepository.findById(id)
                .orElseThrow(
                        () -> new NotFoundException(" Code not found !!")
                );
    }

    public Code delete(Long id){
        Code code = this.findOne(id);
        this.codeRepository.delete(code);

        return code;
    }

}
