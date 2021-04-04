package com.dravicenne.backend.models.login;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class LoginPatient {
    private String username;
    private String password;
}
