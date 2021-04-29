package com.dravicenne.backend.models.dto;

import com.dravicenne.backend.models.Patient;
import com.dravicenne.backend.models.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlainPatientDto extends User {
    private String username;
    private String groupeSang;
    private LocalDate dateNaiss;
    private Integer age;

    public static PlainPatientDto from(Patient patient){
        PlainPatientDto patientDto = new PlainPatientDto();

        patientDto.setId(patient.getId());
        patientDto.setUsername(patient.getUsername());
        patientDto.setNom(patient.getNom());
        patientDto.setPrenom(patient.getPrenom());
        patientDto.setAge(patient.getAge());
        patientDto.setDateNaiss(patient.getDateNaiss());
        patientDto.setGroupeSang(patient.getGroupeSang());
        patientDto.setPhone(patient.getPhone());
        patientDto.setEmail(patient.getEmail());
        patientDto.setPassword(patient.getPassword());
        patientDto.setCpassword(patient.getCpassword());
        patientDto.setVille(patient.getVille());
        patientDto.setToken(patient.getToken());

        return patientDto;
    }
}
