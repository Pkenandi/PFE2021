package com.dravicenne.backend.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data
public class SpecialiteDto {
    private Long id;
    private String specialite;
    private String description;
    private List<PlainMedecinDto> plainMedecinDto = new ArrayList<>();


}
