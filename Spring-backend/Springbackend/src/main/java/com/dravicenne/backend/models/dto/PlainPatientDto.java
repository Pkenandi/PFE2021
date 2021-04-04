package com.dravicenne.backend.models.dto;

import com.dravicenne.backend.models.Patient;
import com.dravicenne.backend.models.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlainPatientDto extends User {
    private String username;
    private String groupeSang;

    public static PlainPatientDto from(Patient patient){
        PlainPatientDto patientDto = new PlainPatientDto();
        patientDto.setId(patient.getId());
        patientDto.setUsername(patient.getUsername());
        patientDto.setNom(patient.getNom());

        return patientDto;
    }
}
