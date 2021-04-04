package com.dravicenne.backend.models.login;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginMedecin {
    private String cin;
    private String password;
}
