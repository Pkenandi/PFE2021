package com.dravicenne.backend.models.dto;

import com.dravicenne.backend.models.Patient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity(name = "paiement")
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data
public class PaiementDto implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    @Column(unique = true, nullable = false)
    private Long numero;
    private LocalDate date_expiration;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    private Patient patient;
}
