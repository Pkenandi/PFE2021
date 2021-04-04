package com.dravicenne.backend.models.dto;

import com.dravicenne.backend.models.Patient;
import com.dravicenne.backend.models.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientDto extends User {
    private String username;
    private String groupeSang;
    private Integer age;
    private LocalDate dateNaiss;
    protected List<RendezVousDto> rendezVousList = new ArrayList<>();

    public static PatientDto from(Patient patient){
        PatientDto patientDto = new PatientDto();
        patientDto.setId(patient.getId());
        patientDto.setNom(patient.getNom());
        patientDto.setPrenom(patient.getPrenom());
        patientDto.setVille(patient.getVille());
        patientDto.setUsername(patient.getUsername());
        patientDto.setGroupeSang(patient.getGroupeSang());
        patientDto.setAge(patient.getAge());
        patientDto.setDateNaiss(patient.getDateNaiss());
        patientDto.setEmail(patient.getEmail());
        patientDto.setPhone(patient.getPhone());
        patientDto.setPassword(patient.getPassword());
        patientDto.setCpassword(patient.getCpassword());
        patientDto.setRendezVousList(patient.getRendezVousList().stream()
                .map(RendezVousDto::from)
                .collect(Collectors.toList()));

        return patientDto;
    }
}
