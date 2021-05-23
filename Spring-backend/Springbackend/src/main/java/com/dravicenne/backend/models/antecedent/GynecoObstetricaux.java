package com.dravicenne.backend.models.antecedent;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class GynecoObstetricaux implements Serializable {
    private String nombreGrossesse;
    private String nombreEnfant;
    private String cesarienne;
    private String autres;
}
