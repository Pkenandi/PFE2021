package com.dravicenne.backend.models.plaindto;

import com.dravicenne.backend.models.Patient;
import com.dravicenne.backend.models.User;
import com.dravicenne.backend.models.dto.PatientDto;
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
    private Integer age;
    private LocalDate dateNaiss;

    public static PlainPatientDto from(Patient patient){
        PlainPatientDto plainPatientDto = new PlainPatientDto();
        plainPatientDto.setId(patient.getId());
        plainPatientDto.setNom(patient.getNom());
        plainPatientDto.setPrenom(patient.getPrenom());
        plainPatientDto.setVille(patient.getVille());
        plainPatientDto.setUsername(patient.getUsername());
        plainPatientDto.setGroupeSang(patient.getGroupeSang());
        plainPatientDto.setAge(patient.getAge());
        plainPatientDto.setDateNaiss(patient.getDateNaiss());
        plainPatientDto.setEmail(patient.getEmail());
        plainPatientDto.setPhone(patient.getPhone());
        plainPatientDto.setPassword(patient.getPassword());
        plainPatientDto.setCpassword(patient.getCpassword());

        return plainPatientDto;
    }
}
