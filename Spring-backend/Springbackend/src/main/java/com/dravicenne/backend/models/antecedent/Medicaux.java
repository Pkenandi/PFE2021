package com.dravicenne.backend.models.antecedent;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class Medicaux implements Serializable {
    private String allergie;
    private String diabete;
    private String hypertension;
    private String asthme;
    private String autres;
}
