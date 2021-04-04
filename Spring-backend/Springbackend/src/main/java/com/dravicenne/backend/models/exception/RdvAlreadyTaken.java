package com.dravicenne.backend.models.exception;

import java.text.MessageFormat;

public class RdvAlreadyTaken extends RuntimeException{
    public RdvAlreadyTaken(final Long rdvId, final String username ) {
        super(MessageFormat.format("Rendez-vous : {0} est deja pris par le patient {1}", rdvId, username));
    }
}
