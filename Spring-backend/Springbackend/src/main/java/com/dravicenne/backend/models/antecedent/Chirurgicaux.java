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
public class Chirurgicaux implements Serializable {
    private String operationAnt;
    private String traumatismeAnt;
    private String autres;
}
